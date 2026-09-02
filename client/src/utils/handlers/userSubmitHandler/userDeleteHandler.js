/**
 * @file userDeleteHandler.js
 * @description Handle Delete User
 */

import { deleteUser } from "../../../services/userAPI";

import logoutSubmitHandler from "../authSubmitHandler/logoutSubmitHandler";

/**
 * @async
 * @function userDeleteHandler
 * @description Handle Delete User Form and Log out
 * @param {Event} event - form submission
 * @param {Number} userID
 * @param {String} username
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function userDeleteHandler(
  event,
  userID,
  username,
  setError,
) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  const token = localStorage.getItem("token");
  try {
    await deleteUser(userID, token);

    await logoutSubmitHandler(setError);

    // store SUCCESS message
    localStorage.setItem(
      "successMessage",
      `Account "${username}" successfully deleted !`,
    );
    /*
        REFRESH page
        redirection -> DESTROY useState 
    */
    window.location.href = "/";
  } catch (e) {
    console.log("Form Submission Error:", e);
    setError(e.message);
  }
}
