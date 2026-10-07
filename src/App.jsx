import { useState } from "react";
import Intro from "./components/Intro.jsx";
import Questionnaire from "./pages/Questionnaire.jsx";
import Success from "./components/Success.jsx";

export default function App() {
  const [step, setStep] = useState("intro"); // "intro" | "form" | "success"

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">Questionnaire universitaire</div>
        <div className="app-header__sub">Participation anonyme</div>
      </header>

      <main className="app-main">
        {step === "intro" && <Intro onStart={() => setStep("form")} />}
        {step === "form" && (
          <Questionnaire onSubmitted={() => setStep("success")} />
        )}
        {step === "success" && <Success />}
      </main>

      <footer className="app-footer">
        Étude universitaire — aucune donnée personnelle collectée.
      </footer>
    </div>
  );
}