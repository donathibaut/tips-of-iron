/**
 * @file authMiddleware.js
 * @description Authentification Middleware
 */

const jwt = require("jsonwebtoken");

const { unauthorized } = require("../utils/status");

/**
 * @async
 * @function authMiddleware
 * @description Middleware : Authentification (Token Verification)
 * @param {Object} req - (Token -> req.headers.authorization)
 * @param {Object} res - HTTP Response
 * @param {Function} next - next() process
 * @returns {void} Verified Token || null
 */
const authMiddleware = async (req, res, next) => {
  try {
    /*
     * .split(" ") creates an array from 'type : string' where '" " = index separator'
     * [0] => "Bearer"
     * [1] => "token"
     */
    const userToken = req.headers.authorization.split(" ")[1];

    const verifiedToken = jwt.verify(userToken, process.env.SECRET_KEY);
    req.token = verifiedToken;

    next();
  } catch (e) {
    const errorMessage = "Invalid Token";
    return unauthorized(res, errorMessage);
  }
};

module.exports = authMiddleware;
