/**
 * @file topicDeleteHandler.js
 * @description Handle Update Topic
 */

import { deleteTopic } from "../../../services/topicAPI";

/**
 * @async
 * @function topicDeleteHandler
 * @description Handle Update Topic Form
 * @param {Event} event - form submission
 * @param {Array} sections - sections state
 * @param {Number} userID
 * @param {Number} topicID
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function topicDeleteHandler(
  event,
  userID,
  topicID,
  setError,
) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  if (!userID) {
    const errorMessage = "You are not connected...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  if (!topicID) {
    const errorMessage = "Undefined Topic...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  try {
    console.log(topicID);
    const deletion = await deleteTopic(topicID);
    console.log(deletion);

    // store SUCCESS message
    localStorage.setItem("successMessage", "Your topic has been deleted !");
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
