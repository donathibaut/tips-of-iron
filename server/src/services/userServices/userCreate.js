/**
 * @file userCreate.js
 * @description userCreate function
 */

/**
 * @async
 * @function userCreate
 * @param {string} username
 * @param {string} email
 * @param {object} form - creation form
 * @returns {Promise<Object|null>}
 * @description Create a new user || null
 */
const userCreate = async (username, email, form) => {
  const isUser = await userFindByKey(username, email);

  if (isUser) {
    throw new Error("User Already Exists");
  }

  if (form) {
    try {
      await User.create({
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
  } else {
    throw new Error("Invalid Form");
  }
};
