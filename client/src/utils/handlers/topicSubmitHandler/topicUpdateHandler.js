/**
 * @file topicUpdateHandler.js
 * @description Handle Update Topic
 */

import { postTopic } from "../../../services/topicAPI";

/**
 * @async
 * @function topicUpdateHandler
 * @description Handle Update Topic Form
 * @param {Event} event - form submission
 * @param {Array} sections - sections state
 * @param {Number} id_user
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function topicUpdateHandler(
  event,
  sections,
  id_user,
  setError,
) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  if (!id_user) {
    const errorMessage = "You are not connected...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  const allData = {
    title: event.target.title.value,
    description: event.target.description.value,
    category: event.target.category.value,
    id_user,
    sections: sections,
  };

  try {
    console.log(allData);
    const newTopic = await postTopic(allData);
    console.log(newTopic);

    // store SUCCESS message
    localStorage.setItem("successMessage", "Your topic has been created !");
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
