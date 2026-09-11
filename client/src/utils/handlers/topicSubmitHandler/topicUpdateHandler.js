/**
 * @file topicUpdateHandler.js
 * @description Handle Update Topic
 */

import { patchTopic } from "../../../services/topicAPI";

/**
 * @async
 * @function topicUpdateHandler
 * @description Handle Update Topic Form
 * @param {SubmitEvent} event - form submission
 * @param {Array} sections - sections state
 * @param {Number} userID
 * @param {Number} topicID
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function topicUpdateHandler(
  event,
  sections,
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

  const allData = {
    title: event.target.title.value,
    description: event.target.description.value,
    category: event.target.category.value,
    sections: sections,
  };

  try {
    console.log(allData);
    const updatedTopic = await patchTopic(topicID, allData);
    console.log(updatedTopic);

    // store SUCCESS message
    localStorage.setItem("successMessage", "Your topic has been updated!");
    /*
        REFRESH page
        redirection -> DESTROY useState 
    */
    window.location.href = `/topic/${allData.title}`;
  } catch (e) {
    console.log("Form Submission Error:", e);
    setError(e.message);
  }
}
