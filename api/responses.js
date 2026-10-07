// Serverless function Vercel : POST /api/responses
// Reçoit les 24 réponses Likert + OUV1 facultative, valide, insère dans Neon.

import { neon } from "@neondatabase/serverless";

// ---- Codes autorisés (défense en profondeur) ----
const LIKERT_CODES = [
  "lea1", "lea2", "lea3", "lea4", "lea5",
  "com1", "com2", "com3", "com4",
  "mot1", "mot2", "mot3", "mot4",
  "eng1", "eng2", "eng3",
  "coo1", "coo2", "coo3", "coo4",
  "per1", "per2", "per3", "per4",
];

// Le frontend envoie les codes en majuscules (LEA1, COM1, …).
// On normalise en minuscules pour la base.
const OPEN_CODE_FRONT = "OUV1";
const OPEN_CODE_DB = "ouv1";
const OPEN_MAX_LENGTH = 2000;

// ---- Rate limiting minimal en mémoire ----
// Fenêtre glissante simple par instance. Suffisant pour la V1.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;
const hits = new Map(); // ip -> [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const arr = hits.get(ip) || [];
  const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  return "unknown";
}

// ---- Validation ----
function validatePayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, message: "Requête invalide." };
  }

  const keys = Object.keys(body);
  const allowed = new Set([
    ...LIKERT_CODES.map((c) => c.toUpperCase()),
    OPEN_CODE_FRONT,
  ]);

  for (const k of keys) {
    if (!allowed.has(k)) {
      return { ok: false, message: "Champ inattendu dans la requête." };
    }
  }

  const cleaned = {};

  for (const code of LIKERT_CODES) {
    const frontKey = code.toUpperCase();
    const raw = body[frontKey];
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      return {
        ok: false,
        message: "Toutes les questions obligatoires doivent être répondues.",
      };
    }
    cleaned[code] = n;
  }

  // OUV1 facultative
  let ouv1 = null;
  if (body[OPEN_CODE_FRONT] !== undefined && body[OPEN_CODE_FRONT] !== null) {
    if (typeof body[OPEN_CODE_FRONT] !== "string") {
      return { ok: false, message: "Réponse ouverte invalide." };
    }
    const trimmed = body[OPEN_CODE_FRONT].trim();
    if (trimmed.length > OPEN_MAX_LENGTH) {
      return { ok: false, message: "Réponse ouverte trop longue." };
    }
    ouv1 = trimmed.length > 0 ? trimmed : null;
  }
  cleaned[OPEN_CODE_DB] = ouv1;

  return { ok: true, data: cleaned };
}

// ---- Handler ----
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Méthode non autorisée.",
    });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: "Trop de requêtes. Veuillez réessayer plus tard.",
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({
      success: false,
      message: "Corps de requête invalide.",
    });
  }

  const check = validatePayload(body);
  if (!check.ok) {
    return res.status(400).json({
      success: false,
      message: check.message,
    });
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    // Ne jamais exposer le détail au frontend.
    console.error("DATABASE_URL manquant.");
    return res.status(500).json({
      success: false,
      message: "Impossible d'enregistrer la réponse.",
    });
  }

  const sql = neon(dbUrl);
  const d = check.data;

  try {
    await sql`
      INSERT INTO responses (
        lea1, lea2, lea3, lea4, lea5,
        com1, com2, com3, com4,
        mot1, mot2, mot3, mot4,
        eng1, eng2, eng3,
        coo1, coo2, coo3, coo4,
        per1, per2, per3, per4,
        ouv1
      ) VALUES (
        ${d.lea1}, ${d.lea2}, ${d.lea3}, ${d.lea4}, ${d.lea5},
        ${d.com1}, ${d.com2}, ${d.com3}, ${d.com4},
        ${d.mot1}, ${d.mot2}, ${d.mot3}, ${d.mot4},
        ${d.eng1}, ${d.eng2}, ${d.eng3},
        ${d.coo1}, ${d.coo2}, ${d.coo3}, ${d.coo4},
        ${d.per1}, ${d.per2}, ${d.per3}, ${d.per4},
        ${d.ouv1}
      )
    `;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur insertion:", err?.message || err);
    return res.status(500).json({
      success: false,
      message: "Impossible d'enregistrer la réponse.",
    });
  }
}