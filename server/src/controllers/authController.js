/**
 * @file authController.js
 * @description User Authentication Controller
 */

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const User = require("../models/User");
const authFindOne = require("../services/authService");

const { unauthorized, servError, badRequest } = require("../utils/status");

const tableName = "User";

/**
 * @async
 * @function auth
 * @description Controller : Authentication
 * @param {Object} req - Connection Form (email + password)
 * @param {Object} res - Token + Status
 * @returns {Promise<void>} Token || null
 */
const auth = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return badRequest(res, "Email and Password required !");
    }

    const user = await authFindOne(User, req.body.email);

    if (user === null) {
      const errorMessage = "Incorrect Email or Password...";
      return unauthorized(res, errorMessage);
    }

    const verifPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (verifPassword) {
      // sign TOKEN
      const token = jwt.sign(
        { id_user: user.id_user, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );

      // SPECIFIC res.status
      return res.status(200).json({
        token: token,
        success: true,
        message: "You are connected ! :D",
      });
    } else {
      const errorMessage = "Incorrect Email or Password...";
      return unauthorized(res, errorMessage);
    }
  } catch (e) {
    return servError(res, e);
  }
};

module.exports = { auth };
