export default function Intro({ onStart }) {
  return (
    <div className="card">
      <h1>Questionnaire anonyme</h1>
      <p>
        Ce questionnaire est anonyme et sert à un travail universitaire.
        Il n'y a pas de bonne ou de mauvaise réponse.
        Aucune réponse individuelle ne sera communiquée.
      </p>
      <p className="muted small">
        « Ma responsable » désigne la gérante du site.
      </p>
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="btn btn--primary" onClick={onStart}>
          Commencer le questionnaire
        </button>
      </div>
    </div>
  );
}