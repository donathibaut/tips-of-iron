/**
 * @file userUpdateHandler.js
 * @description Handle Update User
 */

import { patchUser } from "../../../services/userAPI";
import { postAuth } from "../../../services/authAPI";

/**
 * @async
 * @function userUpdateHandler
 * @description Handle Update User Form and Update token
 * @param {Event} event - form submission
 * @param {String} setError - set error message
 * @returns {Promise<void>} Token || null
 */
export default async function userUpdateHandler(event, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  // XML data format TO FormData
  const formData = new FormData(event.target);
  // FormData TO JavaScript Object
  const data = Object.fromEntries(formData);

  if (data.password !== data.confirmPassword) {
    const errorMessage = "Passwords do not match...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  const { confirmPassword, ...userFields } = data;

  try {
    const newUser = await postUser(userFields);
    console.log(newUser);

    // update token
    const authFields = {
      email: userFields.email,
      password: userFields.password,
    };
    await postAuth(authFields);

    // store SUCCESS message
    localStorage.setItem("successMessage", "Account successfully updated !");
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
