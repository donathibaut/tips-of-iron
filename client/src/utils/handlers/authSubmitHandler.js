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
 * @returns {Promise<void>} Token || null
 */
export default async function authSubmitHandler(event) {
  // PREVENT page refresh on form submission
  event.preventDefault();

  // XML data format TO FormData
  const formData = new FormData(event.target);
  // FormData TO JavaScript Object
  const data = Object.fromEntries(formData.entries());

  try {
    const token = await postAuth(data);
    console.log(token);
  } catch (e) {
    console.log("Authentication Error:", e);
  }
}
