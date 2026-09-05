/**
 * @file userUpdateHandler.js
 * @description Handle Update User
 */

import { patchUser } from "../../../services/userAPI";

/**
 * @async
 * @function userUpdateHandler
 * @description Handle Update User Form and Update token
 * @param {SubmitEvent} event - form submission
 * @param {Number} userID
 * @param {Function} setError - set error message
 * @returns {Promise<void>} Token || null
 */
export default async function userUpdateHandler(event, userID, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  // verify connection
  const token = localStorage.getItem("token");
  if (!token) {
    const errorMessage = "Your are not connected...";
    console.log(errorMessage);
    return setError(errorMessage);
  }

  // XML data format TO FormData
  const formData = new FormData(event.target);
  // FormData TO JavaScript Object
  const data = Object.fromEntries(formData);

  // password UPDATE verification
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    const errorMessage =
      '"New Password" and "Confirm your New Password" do not match...';
    console.log(errorMessage);
    return setError(errorMessage);
  }

  try {
    // is password update
    if (data.confirmNewPassword) {
      const { confirmNewPassword, ...userFields } = data;
      await patchUser(userID, token, userFields);
    } else {
      await patchUser(userID, token, data);
    }

    // store SUCCESS message
    localStorage.setItem("successMessage", "Account successfully updated!");
    /*
        REFRESH page
        redirection -> DESTROY useState 
    */
    window.location.href = "/update-user";
  } catch (e) {
    console.log("Form Submission Error:", e);
    setError(e.message);
  }
}
