/**
 * @file authSubmitHandler.js
 * @description Handle Authentication
 */

import { postAuth } from "../../services/authAPI";

/**
 * @async
 * @function authSubmitHandler
 * @description Handle Authentication Form
 * @param {Event} event - form submission
 * @param {String} setError - set error message
 * @param {useNavigate} navigate - useNavigate
 * @returns {Promise<void>} Token || null
 */
export async function authSubmitHandler(event, setError, navigate) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  // XML data format TO FormData
  const formData = new FormData(event.target);
  // FormData TO JavaScript Object
  const data = Object.fromEntries(formData);

  try {
    await postAuth(data);

    /* 
        redirect to Home page with SUCCESS message
        redirection -> DESTROY useState
    */
    navigate("/", { state: { successMessage: "You are connected !" } });
  } catch (e) {
    console.log("Authentication Error:", e);
    setError(e.message);
  }
}
