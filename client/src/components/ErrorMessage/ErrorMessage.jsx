export default function ErrorMessage({ error }) {
  return (
    //ERROR MESSAGE
    error !== null && <p className="error-message">{error}</p>
  );
}
