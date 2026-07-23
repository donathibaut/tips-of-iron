/**
 * @file userUpdate.js
 * @description userUpdate function
 */

const { update } = require("../basicService");
const { userFindOne } = require("../userService");

/**
 * @async
 * @function userUpdate
 * @param {object} User - User Model
 * @param {object} form - update form
 * @param {object} oldEmail - email reference
 * @returns {Promise<Object|null>}
 * @description Update user personal data || null
 */
const userUpdate = async (User, form, oldEmail) => {
  const isUser = await userFindOne(form);

  if (!isUser) {
    throw new Error("User Not Found");
  }
  try {
    await update(
      User,
      {
        username: form.username,
        email: form.email,
        password: form.password,
      },
      {
        where: { email: oldEmail },
      },
    );

    return {
      success: true,
      message: "Information has been successfully updated !",
    };
  } catch (e) {
    return {
      success: false,
      message: `Update Failed : ${e.message} :(`,
    };
  }
};
