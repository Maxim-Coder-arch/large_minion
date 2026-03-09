import "../../styles/errors/errors.scss";

export default function ErrorTemplate({ error }: { error: string }) {
  return (
    <div className="error-container">
      <div className="error-message">{error}</div>
    </div>
  );
}