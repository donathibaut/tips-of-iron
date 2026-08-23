/**
 * @file userSubmitHandler.js
 * @description Handle User
 */

import { postUser } from "../../services/userAPI";
import { postAuth } from "../../services/authAPI";

/**
 * @async
 * @function userCreateHandler
 * @description Handle Create User Form and Create Session with it
 * @param {Event} event - form submission
 * @param {String} setError - set error message
 * @param {useNavigate} navigate - useNavigate
 * @returns {Promise<void>} Token || null
 */
export async function userCreateHandler(event, setError, navigate) {
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

    // auth with the new user
    const authFields = {
      email: userFields.email,
      password: userFields.password,
    };
    await postAuth(authFields);

    /* 
        redirect to Home page with SUCCESS message
        redirection -> DESTROY useState
    */
    navigate("/", {
      state: { successMessage: "Welcome to Tips of Iron !" },
    });
  } catch (e) {
    console.log("Form Submission Error:", e);
    setError(e.message);
  }
}
