import { LIKERT_LABELS } from "../data/questionnaire.js";

export default function LikertScale({ value, onChange, name }) {
  return (
    <div className="likert" role="radiogroup">
      {LIKERT_LABELS.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`likert__option${selected ? " is-selected" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
            />
            <span className="likert__value">{opt.value}</span>
            <span className="likert__label">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}