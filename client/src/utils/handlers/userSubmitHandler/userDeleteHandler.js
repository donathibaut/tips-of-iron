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
 * @param {SubmitEvent} event - form submission
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

  if (!userID) {
    const errorMessage = "Undefined User...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  const password = event.target.password.value;

  if (!password) {
    const errorMessage = "Passwords needed...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  const token = localStorage.getItem("token");
  try {
    await deleteUser(userID, password, token);

    await logoutSubmitHandler(setError);

    // store SUCCESS message
    localStorage.setItem(
      "successMessage",
      `Account "${username}" successfully deleted!`,
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
