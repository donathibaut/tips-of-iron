/**
 * @file authController.js
 * @description User Authentification Controller
 */

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/User");
const authFindOne = require("../services/authService");

const {
  success,
  unauthorized,
  notFound,
  servError,
} = require("./utils/status");

const tableName = "User";

/**
 * @async
 * @function auth
 * @description Controller : Authentification
 * @param {Object} req - Connection Form (email + password)
 * @param {Object} res - Token + Status
 * @returns {Promise<void>} Token || null
 */
const auth = async (req, res) => {
  try {
    const user = await authFindOne(User, req.body.email);

    if (user === null) {
      return notFound(res, tableName);
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);

    if (isPassword) {
      // signing the TOKEN
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      // SPECIFIC res.status
      return res.status(200).json({
        token: token,
        success: true,
        message: "You are connected ! :D",
      });
    } else {
      return unauthorized(res);
    }
  } catch (e) {
    servError(res, e);
  }
};
