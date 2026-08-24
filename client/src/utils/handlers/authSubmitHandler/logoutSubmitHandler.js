/**
 * @file logoutSubmitHandler.js
 * @description Handle Logout
 */

/**
 * @async
 * @function logoutSubmitHandler
 * @description Handle LOGOUT Form
 * @param {Event} event - logout submission
 * @param {String} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function logoutSubmitHandler(event, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  try {
    // DESTROY TOKEN
    localStorage.removeItem("token");

    // store SUCCESS message
    localStorage.setItem("successMessage", "You are disconnected !");
    /*
        REFRESH page
        redirection -> DESTROY useState 
    */
    window.location.href = "/";
  } catch (e) {
    console.log("Disconnection Error:", e);
    setError("You are not connected !");
  }
}
