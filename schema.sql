-- Table des réponses au questionnaire
-- Toutes les colonnes Likert sont NOT NULL et contraintes entre 1 et 5.
-- COM3 est stockée telle quelle (1..5). Le recodage x' = 6 - x
-- se fera uniquement lors de l'analyse.

CREATE TABLE IF NOT EXISTS responses (
  id          SERIAL PRIMARY KEY,

  lea1        SMALLINT NOT NULL CHECK (lea1 BETWEEN 1 AND 5),
  lea2        SMALLINT NOT NULL CHECK (lea2 BETWEEN 1 AND 5),
  lea3        SMALLINT NOT NULL CHECK (lea3 BETWEEN 1 AND 5),
  lea4        SMALLINT NOT NULL CHECK (lea4 BETWEEN 1 AND 5),
  lea5        SMALLINT NOT NULL CHECK (lea5 BETWEEN 1 AND 5),

  com1        SMALLINT NOT NULL CHECK (com1 BETWEEN 1 AND 5),
  com2        SMALLINT NOT NULL CHECK (com2 BETWEEN 1 AND 5),
  com3        SMALLINT NOT NULL CHECK (com3 BETWEEN 1 AND 5),
  com4        SMALLINT NOT NULL CHECK (com4 BETWEEN 1 AND 5),

  mot1        SMALLINT NOT NULL CHECK (mot1 BETWEEN 1 AND 5),
  mot2        SMALLINT NOT NULL CHECK (mot2 BETWEEN 1 AND 5),
  mot3        SMALLINT NOT NULL CHECK (mot3 BETWEEN 1 AND 5),
  mot4        SMALLINT NOT NULL CHECK (mot4 BETWEEN 1 AND 5),

  eng1        SMALLINT NOT NULL CHECK (eng1 BETWEEN 1 AND 5),
  eng2        SMALLINT NOT NULL CHECK (eng2 BETWEEN 1 AND 5),
  eng3        SMALLINT NOT NULL CHECK (eng3 BETWEEN 1 AND 5),

  coo1        SMALLINT NOT NULL CHECK (coo1 BETWEEN 1 AND 5),
  coo2        SMALLINT NOT NULL CHECK (coo2 BETWEEN 1 AND 5),
  coo3        SMALLINT NOT NULL CHECK (coo3 BETWEEN 1 AND 5),
  coo4        SMALLINT NOT NULL CHECK (coo4 BETWEEN 1 AND 5),

  per1        SMALLINT NOT NULL CHECK (per1 BETWEEN 1 AND 5),
  per2        SMALLINT NOT NULL CHECK (per2 BETWEEN 1 AND 5),
  per3        SMALLINT NOT NULL CHECK (per3 BETWEEN 1 AND 5),
  per4        SMALLINT NOT NULL CHECK (per4 BETWEEN 1 AND 5),

  ouv1        TEXT NULL,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Aucun index supplémentaire nécessaire pour la V1.
-- Aucun champ identifiant n'est stocké : anonymat garanti.