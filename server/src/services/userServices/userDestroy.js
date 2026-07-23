/**
 * @file userDestroy.js
 * @description userDestroy function
 */

const { destroy } = require("../basicService");
const { userFindOne } = require("../userService");

/**
 * @async
 * @function userDestroy
 * @param {object} User - User Model
 * @param {object} target - Targeted User Account
 * @returns {Promise<Object|null>}
 * @description Destroy user account || null
 */
const userDestroy = async (User, target) => {
  const isUser = await userFindOne(target);

  if (isUser && isUser.email === target.email) {
    try {
      await destroy(User, {
        // Take email value and not isUser.email -> Data Consistency Verification
        where: { email: target.email },
      });

      return {
        success: true,
        message: "The user has been successfully deleted !",
      };
    } catch (e) {
      return {
        success: false,
        message: `Deletion Failed : ${e.message} :(`,
      };
    }
  } else {
    throw new Error("User Not Found : Email Issue");
  }
};
