import "./ErrorMessage.css";

export default function ErrorMessage({ error }) {
  return (
    //ERROR MESSAGE
    error !== null && <p className="error-message message-banner">{error}</p>
  );
}
