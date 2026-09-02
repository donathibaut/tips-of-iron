/**
 * @file userController.js
 * @description User CRUD Controller
 */

const bcrypt = require("bcrypt");

const User = require("../models/User");
const tableName = "User";

const { findByPk } = require("../services/basicService");

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
  forbidden,
  notFound,
  servError,
  errorBlock,
  badRequest,
  unauthorized,
} = require("../utils/status");

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
    const id_user = req.params.id_user;

    const user = await userFindByPk(User, id_user);

    if (user === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, user);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function postUser
 * @description Controller : Create User
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const postUser = async (req, res) => {
  try {
    const result = await userCreate(User, req.body);

    return successCreated(res, result.message, result.user);
  } catch (e) {
    if (
      e.message === "Form Field Empty" ||
      e.message === "User Already Exists"
    ) {
      return badRequest(res, e.message);
    }
    return servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function patchUser
 * @description Controller : Update User
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const patchUser = async (req, res) => {
  try {
    const id_user = req.params.id_user;

    const isUser = await userFindByPk(User, id_user);
    if (!isUser) {
      return notFound(res, tableName);
    }

    if (req.body.password && req.body.newPassword) {
      // /!\ isUser excludes password /!\
      const userWithHash = await findByPk(User, id_user);

      const verifPassword = await bcrypt.compare(
        req.body.password,
        userWithHash.password,
      );
      if (!verifPassword) {
        const errorMessage = "Incorrect Password";
        return unauthorized(res, errorMessage);
      }
    }

    if (Number(req.token.id_user) === Number(id_user) || req.token.role === 1) {
      const user = await userUpdate(User, req.body, id_user);
      return res.status(200).json({
        token: user.token,
        success: true,
        message: user.message,
      });
    } else {
      const forbiddenMessage = "You don't have the right!";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    if (e.message === "Form Field Empty") {
      return badRequest(res, e.message);
    }
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function deleteUser
 * @description Controller : Destroy User
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const deleteUser = async (req, res) => {
  try {
    const id_user = req.params.id_user;

    const isUser = await userFindByPk(User, id_user);
    if (!isUser) {
      return notFound(res, tableName);
    }

    if (Number(req.token.id_user) === Number(id_user) || req.token.role === 1) {
      const user = await userDestroy(User, id_user);
      return success(res, user.message);
    } else {
      const forbiddenMessage = "You don't have the right!";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getUserById,
  postUser,
  patchUser,
  deleteUser,
};
