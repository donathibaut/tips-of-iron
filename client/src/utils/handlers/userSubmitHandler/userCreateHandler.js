/**
 * @file userCreateHandler.js
 * @description Handle Create User
 */

import { postUser } from "../../../services/userAPI";
import { postAuth } from "../../../services/authAPI";

/**
 * @async
 * @function userCreateHandler
 * @description Handle Create User Form and Create Session with it
 * @param {SubmitEvent} event - form submission
 * @param {Function} setError - set error message
 * @returns {Promise<void>} Token || null
 */
export default async function userCreateHandler(event, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  // XML data format TO FormData
  const formData = new FormData(event.target);
  // FormData TO JavaScript Object
  const data = Object.fromEntries(formData);

  if (data.password !== data.confirmPassword) {
    console.log(data.password, data.confirmPassword);
    const errorMessage = "Passwords do not match...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  const { confirmPassword, ...userFields } = data;

  try {
    const newUser = await postUser(userFields);
    console.log(newUser);

    // auth with the new user
    const authFields = {
      email: userFields.email,
      password: userFields.password,
    };
    await postAuth(authFields);

    // store SUCCESS message
    localStorage.setItem("successMessage", "Welcome to Tips of Iron !");
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
