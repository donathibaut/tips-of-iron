/**
 * @file logoutSubmitHandler.js
 * @description Handle Logout
 */

/**
 * @async
 * @function logoutSubmitHandler
 * @description Handle LOGOUT Form
 * @param {SubmitEvent} event - logout submission
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function logoutSubmitHandler(setError, event = null) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  if (event !== null) {
    event.preventDefault();
  }

  try {
    // DESTROY TOKEN
    localStorage.removeItem("token");

    // store SUCCESS message
    localStorage.setItem("successMessage", "You are disconnected!");
    /*
        REFRESH page
        redirection -> DESTROY useState 
    */
    window.location.href = "/";
  } catch (e) {
    console.log("Disconnection Error:", e);
    setError("You are not connected!");
  }
}
