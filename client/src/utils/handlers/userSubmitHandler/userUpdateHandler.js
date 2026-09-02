/**
 * @file userUpdateHandler.js
 * @description Handle Update User
 */

import { patchUser } from "../../../services/userAPI";

/**
 * @async
 * @function userUpdateHandler
 * @description Handle Update User Form and Update token
 * @param {Event} event - form submission
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
    let updateUser;
    // is password update
    if (data.confirmNewPassword) {
      const { confirmNewPassword, ...userFields } = data;
      updateUser = await patchUser(userID, token, userFields);
    } else {
      updateUser = await patchUser(userID, token, data);
    }

    if (updateUser) {
      // store SUCCESS message
      localStorage.setItem("successMessage", "Account successfully updated !");
      /*
        REFRESH page
        redirection -> DESTROY useState 
    */
      window.location.href = "/update-user";
    } else {
      setError("Incorrect Password");
    }
  } catch (e) {
    console.log("Form Submission Error:", e);
    setError(e.message);
  }
}
