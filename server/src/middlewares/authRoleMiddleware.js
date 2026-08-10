/**
 * @file authRoleMiddleware.js
 * @description Role Authentication Middleware
 */

const jwt = require("jsonwebtoken");

const { unauthorized, forbidden } = require("../utils/status");

/**
 * @async
 * @function authRoleMiddleware
 * @description Middleware : Authentication (Token Role Verification)
 * @param {Object} req - (Token -> req.headers.authorization)
 * @param {Object} res - HTTP Response
 * @param {Function} next - next() process
 * @returns {void} Verified Token Role (1 || 2) || null
 */
const authRoleMiddleware = (checkRole) => {
  return async (req, res, next) => {
    try {
      const userToken = req.headers.authorization.split(" ")[1];

      const verifiedToken = jwt.verify(userToken, process.env.SECRET_KEY);

      if (checkRole.includes(verifiedToken.role)) {
        req.token = verifiedToken;
        next();
      } else {
        const errorMessage = "Invalid Role";
        return forbidden(res, errorMessage);
      }
    } catch (e) {
      const errorMessage = "Invalid Token";
      return unauthorized(res, errorMessage);
    }
  };
};

module.exports = authRoleMiddleware;
