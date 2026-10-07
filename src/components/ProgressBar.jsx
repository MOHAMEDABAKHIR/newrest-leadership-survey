export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="progress">
      <div className="progress__top">
        <span>Question {current} / {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="progress__bar">
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}