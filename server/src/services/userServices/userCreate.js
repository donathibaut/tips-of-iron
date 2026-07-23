/**
 * @file userCreate.js
 * @description userCreate function
 */

const { create } = require("../basicService");
const { userFindOne } = require("../userService");

/**
 * @async
 * @function userCreate
 * @param {object} User - User Model
 * @param {object} form - creation form
 * @returns {Promise<Object|null>}
 * @description Create a new user || null
 */
const userCreate = async (User, form) => {
  const isUser = await userFindOne(form);

  if (isUser) {
    throw new Error("User Already Exists");
  }

  try {
    await create(User, {
      username: form.username,
      email: form.email,
      password: form.password,
    });
    return {
      success: true,
      message: "The user has been successfully created !",
    };
  } catch (e) {
    return {
      success: false,
      message: `Creation Failed : ${e.message} :(`,
    };
  }
};
