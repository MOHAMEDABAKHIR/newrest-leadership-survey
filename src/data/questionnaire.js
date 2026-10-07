// Structure interne du questionnaire.
// Les dimensions et hypothèses restent internes : elles NE DOIVENT PAS
// être affichées au répondant.
//
// reverse: true uniquement pour COM3. Le recodage (x' = 6 - x)
// se fera lors de l'analyse, PAS dans le frontend ni à l'insertion.

export const LIKERT_LABELS = [
  { value: 1, label: "Pas du tout d'accord" },
  { value: 2, label: "Pas d'accord" },
  { value: 3, label: "Neutre" },
  { value: 4, label: "D'accord" },
  { value: 5, label: "Tout à fait d'accord" },
];

export const QUESTIONS = [
  // --- LEADERSHIP ---
  {
    code: "LEA1",
    dimension: "Leadership",
    sub: "Accompagnement",
    hypothesis: ["H1"],
    reverse: false,
    text: "Ma responsable m'accompagne quand je rencontre une difficulté dans mon travail.",
  },
  {
    code: "LEA2",
    dimension: "Leadership",
    sub: "Développement des compétences",
    hypothesis: ["H1"],
    reverse: false,
    text: "Elle m'aide à progresser et à acquérir de nouvelles compétences.",
  },
  {
    code: "LEA3",
    dimension: "Leadership",
    sub: "Reconnaissance",
    hypothesis: ["H1"],
    reverse: false,
    text: "Elle reconnaît mon travail quand il est bien fait.",
  },
  {
    code: "LEA4",
    dimension: "Leadership",
    sub: "Participation aux décisions",
    hypothesis: ["H1"],
    reverse: false,
    text: "Elle me demande mon avis avant de prendre une décision qui concerne mon travail.",
  },
  {
    code: "LEA5",
    dimension: "Leadership",
    sub: "Prise en compte des suggestions",
    hypothesis: ["H1"],
    reverse: false,
    text: "Elle tient compte des suggestions de l'équipe pour organiser le travail.",
  },

  // --- COMMUNICATION ---
  {
    code: "COM1",
    dimension: "Communication",
    sub: "Clarté des consignes",
    hypothesis: ["H2"],
    reverse: false,
    text: "Les consignes que je reçois sont claires.",
  },
  {
    code: "COM2",
    dimension: "Communication",
    sub: "Information sur les changements",
    hypothesis: ["H2"],
    reverse: false,
    text: "Je suis informé(e) à temps des changements (menus, effectifs, livraisons).",
  },
  {
    code: "COM3",
    dimension: "Communication",
    sub: "Signalement des erreurs",
    hypothesis: ["H2"],
    reverse: true, // <-- QUESTION INVERSÉE
    text: "Je n'ose pas signaler une erreur ou un problème à ma responsable.",
  },
  {
    code: "COM4",
    dimension: "Communication",
    sub: "Circulation de l'information",
    hypothesis: ["H2"],
    reverse: false,
    text: "Les informations circulent bien entre les membres de l'équipe.",
  },

  // --- MOTIVATION ---
  {
    code: "MOT1",
    dimension: "Motivation",
    sub: "Envie de bien faire",
    hypothesis: ["H3"],
    reverse: false,
    text: "J'ai envie de bien faire mon travail.",
  },
  {
    code: "MOT2",
    dimension: "Motivation",
    sub: "Objectifs réalisables",
    hypothesis: ["H3"],
    reverse: false,
    text: "Les objectifs qui me sont fixés sont réalisables.",
  },
  {
    code: "MOT3",
    dimension: "Motivation",
    sub: "Motivation globale",
    hypothesis: ["H3"],
    reverse: false,
    text: "Je suis motivé(e) à venir travailler.",
  },
  {
    code: "MOT4",
    dimension: "Motivation",
    sub: "Entraînement du responsable",
    hypothesis: ["H3"],
    reverse: false,
    text: "Ma responsable me donne envie d'atteindre les objectifs du site.",
  },

  // --- ENGAGEMENT ---
  {
    code: "ENG1",
    dimension: "Engagement",
    sub: "Concernement",
    hypothesis: ["H4"],
    reverse: false,
    text: "Je me sens concerné(e) par les résultats du site.",
  },
  {
    code: "ENG2",
    dimension: "Engagement",
    sub: "Effort supplémentaire",
    hypothesis: ["H4"],
    reverse: false,
    text: "Je suis prêt(e) à fournir un effort supplémentaire en période de forte activité.",
  },
  {
    code: "ENG3",
    dimension: "Engagement",
    sub: "Fidélisation",
    hypothesis: ["H4"],
    reverse: false,
    text: "Je me vois continuer à travailler sur ce site dans les mois à venir.",
  },

  // --- COOPÉRATION ET COORDINATION ---
  {
    code: "COO1",
    dimension: "Coopération et coordination",
    sub: "Entraide",
    hypothesis: ["H5"],
    reverse: false,
    text: "Les membres de l'équipe s'entraident.",
  },
  {
    code: "COO2",
    dimension: "Coopération et coordination",
    sub: "Répartition des tâches",
    hypothesis: ["H5"],
    reverse: false,
    text: "La répartition des tâches est claire et équitable.",
  },
  {
    code: "COO3",
    dimension: "Coopération et coordination",
    sub: "Coordination externe",
    hypothesis: ["H5"],
    reverse: false,
    text: "La coordination avec les autres intervenants (cuisine, livraisons, fournisseurs) se passe bien.",
  },
  {
    code: "COO4",
    dimension: "Coopération et coordination",
    sub: "Gestion des imprévus",
    hypothesis: ["H5"],
    reverse: false,
    text: "En cas d'imprévu (retard, absence), l'équipe s'organise efficacement.",
  },

  // --- PERFORMANCE PERÇUE ---
  {
    code: "PER1",
    dimension: "Performance perçue",
    sub: "Hygiène et sécurité",
    hypothesis: ["H6"],
    reverse: false,
    text: "Les règles d'hygiène et de sécurité alimentaire sont respectées.",
  },
  {
    code: "PER2",
    dimension: "Performance perçue",
    sub: "Qualité des repas",
    hypothesis: ["H6"],
    reverse: false,
    text: "La qualité des repas servis est satisfaisante.",
  },
  {
    code: "PER3",
    dimension: "Performance perçue",
    sub: "Atteinte des objectifs",
    hypothesis: ["H6"],
    reverse: false,
    text: "L'équipe atteint les objectifs fixés (délais, pertes, stocks).",
  },
  {
    code: "PER4",
    dimension: "Performance perçue",
    sub: "Fonctionnement global",
    hypothesis: ["H6"],
    reverse: false,
    text: "Globalement, le site fonctionne bien.",
  },
];

// Question ouverte facultative
export const OPEN_QUESTION = {
  code: "OUV1",
  text: "Selon vous, qu'est-ce qui pourrait être amélioré dans le fonctionnement du site ?",
  required: false,
  maxLength: 2000,
};

// Nombre total d'étapes affichées (24 Likert + 1 ouverte)
export const TOTAL_LIKERT = QUESTIONS.length; // 24
export const TOTAL_STEPS = TOTAL_LIKERT + 1;  // 25