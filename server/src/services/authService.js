/**
 * @file authService.js
 * @description Authentification Service
 */

const { findOne } = require("./basicService");

/**
 * @async
 * @function authFindOne
 * @description Find the corresponding User Account || null
 * @param {object} User - User Model
 * @param {object} email
 * @returns {Promise<Object|null>}
 */
const authFindOne = async (User, email) => {
  if (email && email !== "") {
    return await findOne(User, {
      where: {
        email: email,
      },
    });
  } else {
    return null;
  }
};

module.exports = authFindOne;
