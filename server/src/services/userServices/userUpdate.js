/**
 * @file userUpdate.js
 * @description userUpdate function
 */

/**
 * @async
 * @function userUpdate
 * @param {object} session - user session -> session.email
 * @param {string} username
 * @param {string} email
 * @param {object} form - update form
 * @returns {Promise<Object|null>}
 * @description Update user personal data || null
 */
const userUpdate = async (session, username, email, form) => {
  const isUser = await userFindByKey(username, email);

  if (!isUser) {
    throw new Error("User Not Found");
  }
  // session verification -> session.email needed
  else if (!session) {
    throw new Error("You are not connected !");
  } else if (form) {
    try {
      await User.update(
        {
          username: form.username,
          email: form.email,
          password: form.password,
        },
        {
          where: { email: session.email },
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
  } else {
    throw new Error("Invalid Form");
  }
};
