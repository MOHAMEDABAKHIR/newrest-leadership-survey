# Questionnaire universitaire anonyme

Application web (React + Vite + Vercel Functions + Neon PostgreSQL)
permettant à des collaborateurs de répondre anonymement à un
questionnaire universitaire.

## Garanties d'anonymat

- Aucun nom, prénom, email, téléphone, matricule, identifiant.
- Aucun tracking (pas de Google Analytics, pas de Pixel).
- Aucun cookie nominatif.
- Aucune IP ni user-agent stockée en base.
- Seules les 24 réponses Likert + la réponse ouverte facultative
  sont enregistrées, avec un horodatage technique `created_at`.

## Prérequis

- Node.js ≥ 20
- Un compte Vercel
- Une base Neon PostgreSQL

## Installation locale

```bash
git clone <repo>
cd questionnaire-app
npm install
cp .env.example .env
# Éditer .env et renseigner DATABASE_URL
```

## Créer la base Neon

1. Créer un projet sur https://neon.tech
2. Copier la **Connection string** (mode *Pooled* recommandé pour Vercel).
3. Ouvrir le SQL Editor de Neon et exécuter le contenu de `schema.sql`.

Ou via `psql` :

```bash
psql "$DATABASE_URL" -f schema.sql
```

## Lancer localement

Pour tester **le frontend seul** (l'API renverra 404) :

```bash
npm run dev
```

Pour tester **frontend + API** (recommandé) :

```bash
npm install -g vercel
vercel dev
```

Vercel CLI lit automatiquement `.env` et expose `/api/responses`.

## Tester l'API manuellement

```bash
curl -X POST http://localhost:3000/api/responses \
  -H "Content-Type: application/json" \
  -d '{
    "LEA1":1,"LEA2":2,"LEA3":3,"LEA4":4,"LEA5":5,
    "COM1":1,"COM2":2,"COM3":3,"COM4":4,
    "MOT1":1,"MOT2":2,"MOT3":3,"MOT4":4,
    "ENG1":1,"ENG2":2,"ENG3":3,
    "COO1":1,"COO2":2,"COO3":3,"COO4":4,
    "PER1":1,"PER2":2,"PER3":3,"PER4":4,
    "OUV1":"Test"
  }'
```

Réponse attendue : `{"success":true}`

## Déployer sur Vercel

1. Pousser le projet sur GitHub.
2. Sur Vercel : **New Project** → importer le repo.
3. Framework preset : **Vite** (détecté automatiquement).
4. Dans **Settings → Environment Variables**, ajouter :
   - `DATABASE_URL` = (chaîne Neon)
   pour les environnements *Production*, *Preview* et *Development*.
5. Déployer. L'URL publique est fournie par Vercel.

## Note sur COM3

COM3 est une question inversée. Elle est stockée **telle quelle**
(1 à 5). Le recodage `x' = 6 - x` se fera **uniquement lors de
l'analyse**, jamais dans le frontend ni à l'insertion.

## Export futur

Un export CSV pourra être ajouté ultérieurement en lisant
directement la table `responses` via une route protégée.
Aucun dashboard public n'est fourni dans cette V1.