/**
 * @file status.js
 * @description Status messages
 */

/**
 * @function success
 * @description GENERIC SUCCESS
 * @param {object} res
 * @param {string} message - Success Message
 * @returns {Object} Status 200
 */
const success = (res, message) => {
  return res.status(200).json({
    success: true,
    message: message,
  });
};

/**
 * @function successOk
 * @description READING SUCCESS
 * @param {object} res
 * @param {string} tableName - Table name -> "User", "Topic", etc...
 * @param {Object} tableObject - Returned object
 * @returns {Object} Status 200
 */
const successOk = (res, tableName, tableObject) => {
  return res.status(200).json({
    result: tableObject,
    success: true,
    message: `${tableName} Found`,
  });
};

/**
 * @function successCreated
 * @description CREATION SUCCESS
 * @param {object} res
 * @param {string} message - Success Message
 * @returns {Object} Status 201
 */
const successCreated = (res, message, result) => {
  return res.status(201).json({
    success: true,
    message: message,
    result: result,
  });
};

/**
 * @function badRequest
 * @description BAD REQUEST ERROR
 * @param {object} res
 * @param {string} message - Error Message
 * @returns {Object} Status 400
 */
const badRequest = (res, message) => {
  return res.status(400).json({
    success: false,
    message: message,
  });
};

/**
 * @function unauthorized
 * @description UNAUTHORIZED ERROR
 * @param {object} res
 * @param {string} message - Error Message
 * @returns {Object} Status 401
 */
const unauthorized = (res, message) => {
  return res.status(401).json({
    success: false,
    message: message,
  });
};

/**
 * @function forbidden
 * @description FORBIDDEN ERROR
 * @param {object} res
 * @param {string} message - Error Message
 * @returns {Object} Status 403
 */
const forbidden = (res, message) => {
  return res.status(403).json({
    success: false,
    message: `Forbidden : ${message}`,
  });
};

/**
 * @function notFound
 * @description NOT FOUND ERROR
 * @param {object} res
 * @param {string} resource - Resource name -> example : Table "User", "Topic", etc...
 * @returns {Object} Status 404
 */
const notFound = (res, resource) => {
  return res.status(404).json({
    success: false,
    message: `Unknown ${resource}`,
  });
};

/**
 * @function servError
 * @description SERVER ERROR
 * @param {object} res
 * @param {string} e - error
 * @returns {Object} Status 500
 */
const servError = (res, e) => {
  return res.status(500).json({
    success: false,
    message: `Request Failed : ${e.message}`,
  });
};

/*============================================================================*/
/**
 * @function errorBlock
 * @description Error Block for Controller
 * @param {Object} res
 * @param {string} e - (e.message -> error message)
 * @param {string} tableName
 * @returns {object} Status 404 || 500
 */
const errorBlock = (res, e, tableName) => {
  if (e.message === `${tableName} Not Found`) {
    return notFound(res, tableName);
  }
  servError(res, e);
};
/*============================================================================*/

module.exports = {
  success,
  successOk,
  successCreated,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  servError,
  errorBlock,
};
