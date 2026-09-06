import { useEffect, useState } from "react";

export default function SuccessMessage() {
  /* 
    Is SUCCESS MESSAGE ?
    Message DELETED by refresh
  */
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    const txt = localStorage.getItem("successMessage");
    if (txt) {
      setSuccessMessage(txt);
      localStorage.removeItem("successMessage");
    }
  }, []);

  return (
    // SUCCESS MESSAGE
    successMessage && <p className="success-message">{successMessage}</p>
  );
}
