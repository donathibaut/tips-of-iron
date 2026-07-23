/**
 * @file userService.js
 * @description CRUD User
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Op } = require("sequelize");

const { findAll, findOne, findByPk } = require("./basicService");

const User = require("../models/User");

/**
 * @async
 * @function userFindAll
 * @returns {Promise<Object|null>}
 * @description Find All Users || null
 */
const userFindAll = async () => {
  return await findAll(User);
};

/**
 * @async
 * @function userCreate
 * @param {object} target - target.username + target.email
 * @returns {Promise<Object|null>}
 * @description Find One User || null
 */
const userFindOne = async (target) => {
  if (target.username || target.email) {
    return await findOne(User, {
      where: {
        [Op.or]: [{ username: target.username }, { email: target.email }],
      },
    });
  } else {
    throw new Error("User Not Found");
  }
};

/**
 * @async
 * @function userCreate
 * @param {number} id
 * @returns {Promise<Object|null>}
 * @description Find User By ID || null
 */
const userFindByPk = async (id) => {
  return await findByPk(User, id);
};

const userCreate = require("./userServices/userCreate");
const userUpdate = require("./userServices/userUpdate");
const userDestroy = require("./userServices/userDestroy");

module.exports = {
  userFindAll,
  userFindOne,
  userFindByPk,
  userCreate,
  userUpdate,
  userDestroy,
};
