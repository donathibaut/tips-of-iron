/**
 * @file userFindByKey.js
 * @description userFindByKey function
 */

/**
 * @async
 * @function userFindByKey
 * @param {string} username
 * @param {string} email
 * @returns {Promise<Object|null>}
 * @description Find user by username or email || null
 */
const userFindByKey = async (username, email) => {
  if (username || email) {
    return await User.findOne({
      where: { [Op.or]: [{ username: username }, { email: email }] },
    });
  } else {
    throw new Error("User Not Found");
  }
};
