import { useMemo, useState } from "react";
import {
  QUESTIONS,
  OPEN_QUESTION,
  TOTAL_STEPS,
} from "../data/questionnaire.js";
import Question from "../components/Question.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

const initialLikert = () => {
  const obj = {};
  for (const q of QUESTIONS) obj[q.code] = null;
  return obj;
};

export default function Questionnaire({ onSubmitted }) {
  const [step, setStep] = useState(0); // 0..23 => Likert, 24 => ouverte
  const [answers, setAnswers] = useState(initialLikert);
  const [openAnswer, setOpenAnswer] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isOpenStep = step === QUESTIONS.length;

  const currentQuestion = useMemo(
    () => (isOpenStep ? null : QUESTIONS[step]),
    [step, isOpenStep]
  );

  const currentValue = currentQuestion ? answers[currentQuestion.code] : null;

  function setLikert(code, value) {
    setAnswers((prev) => ({ ...prev, [code]: value }));
    setError("");
  }

  function goNext() {
    if (!isOpenStep && currentValue === null) {
      setError("Veuillez répondre à cette question avant de continuer.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goPrev() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    // Vérification finale : toutes les 24 Likert doivent être remplies.
    const missing = QUESTIONS.filter((q) => answers[q.code] === null);
    if (missing.length > 0) {
      setError("Veuillez répondre à toutes les questions obligatoires.");
      // Se positionner sur la première manquante
      setStep(QUESTIONS.findIndex((q) => q.code === missing[0].code));
      return;
    }

    setSubmitting(true);
    setError("");

    const payload = { ...answers };
    const trimmed = openAnswer.trim();
    if (trimmed.length > 0) {
      payload.OUV1 = trimmed;
    }

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Erreur d'enregistrement.");
      }
      onSubmitted();
    } catch (e) {
      setError(
        e?.message ||
          "Impossible d'enregistrer la réponse. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <ProgressBar current={step + 1} total={TOTAL_STEPS} />

      {!isOpenStep && currentQuestion && (
        <Question
          question={currentQuestion}
          value={currentValue}
          onChange={(v) => setLikert(currentQuestion.code, v)}
        />
      )}

      {isOpenStep && (
        <div>
          <h2>{OPEN_QUESTION.text}</h2>
          <p className="muted small">Question facultative.</p>
          <textarea
            className="open"
            maxLength={OPEN_QUESTION.maxLength}
            value={openAnswer}
            onChange={(e) => setOpenAnswer(e.target.value)}
            placeholder="Votre réponse (facultatif)"
          />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="row">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={goPrev}
          disabled={step === 0 || submitting}
        >
          Précédent
        </button>

        {!isOpenStep && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={goNext}
            disabled={submitting}
          >
            Suivant
          </button>
        )}

        {isOpenStep && (
          <button
            type="button"
            className="btn btn--primary"
            onClick={submit}
            disabled={submitting}
          >
            {submitting ? "Envoi…" : "Envoyer mes réponses"}
          </button>
        )}
      </div>
    </div>
  );
}