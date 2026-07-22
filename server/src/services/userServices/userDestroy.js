/**
 * @file userDestroy.js
 * @description userDestroy function
 */

/**
 * @async
 * @function userDestroy
 * @param {string} username
 * @param {string} email
 * @returns {Promise<Object|null>}
 * @description Destroy user account || null
 */
const userDestroy = async (username, email) => {
  const isUser = await userFindByKey(username, email);

  if (isUser && isUser.email === email) {
    try {
      await User.destroy({
        // Take email value and not isUser.email -> Data Consistency Verification
        where: { email: email },
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
