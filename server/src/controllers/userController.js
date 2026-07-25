/**
 * @file userController.js
 * @description User CRUD Controller
 */

const User = require("../models/User");
const tableName = "User";

const {
  userFindByPk,
  userCreate,
  userUpdate,
  userDestroy,
} = require("../services/userService");
const {
  success,
  successOk,
  successCreated,
  notFound,
  servError,
} = require("./utils/status");

/*============================================================================*/
/**
 * @async
 * @function getUserById
 * @description Controller : Read User
 * @param {Object} req - Targeted user ID
 * @param {Object} res
 * @returns {Promise<void>} User Data || null
 */
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userFindByPk(User, id);

    if (user === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, user);
  } catch (e) {
    servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function postUser
 * @description Controller : Create User
 * @param {Object} req - req.body -> creation form
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const postUser = async (req, res) => {
  try {
    const user = await userCreate(User, req.body);

    return successCreated(res, user.message);
  } catch (e) {
    servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function patchUser
 * @description Controller : Update User
 * @param {Object} req - req.body -> update form
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const patchUser = async (req, res) => {
  try {
    const user = await userUpdate(User, req.body);

    return success(res, user.message);
  } catch (e) {
    servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function deleteUser
 * @description Controller : Destroy User
 * @param {Object} req - Targeted user ID
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userDestroy(User, id);

    return success(res, user.message);
  } catch (e) {
    servError(res, e);
  }
};

module.exports = {
  getUserById,
  postUser,
  patchUser,
  deleteUser,
};
