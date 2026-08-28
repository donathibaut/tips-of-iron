/**
 * @file loginSubmitHandler.js
 * @description Handle Login
 */

import { postAuth } from "../../../services/authAPI";

/**
 * @async
 * @function loginSubmitHandler
 * @description Handle LOGIN Form
 * @param {Event} event - form submission
 * @param {String} setError - set error message
 * @returns {Promise<void>} Token || null
 */
export default async function loginSubmitHandler(event, setError) {
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

    const token = localStorage.getItem("token");
    if (token) {
      // store SUCCESS message
      localStorage.setItem("successMessage", "You are connected !");
      /*
        REFRESH page
        redirection -> DESTROY useState 
    */
      window.location.href = "/";
    } else {
      setError("Incorrect Email or Password");
    }
  } catch (e) {
    console.log("Authentication Error:", e);
    setError(e.message);
  }
}
