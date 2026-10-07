import LikertScale from "./LikertScale.jsx";

export default function Question({ question, value, onChange }) {
  return (
    <div>
      <p className="question__text">{question.text}</p>
      <LikertScale
        name={question.code}
        value={value}
        onChange={onChange}
      />
      <p className="required">* Question obligatoire</p>
    </div>
  );
}