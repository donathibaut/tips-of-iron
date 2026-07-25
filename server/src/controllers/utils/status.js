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
const successCreated = (res, message) => {
  return res.status(201).json({
    success: true,
    message: message,
  });
};

/**
 * @function unauthorized
 * @description UNAUTHORIZED ERROR
 * @param {object} res
 * @returns {Object} Status 401
 */
const unauthorized = (res) => {
  return res.status(401).json({
    success: false,
    message: "Wrong Password... Try Again :|",
  });
};

/**
 * @function notFound
 * @description NOT FOUND ERROR
 * @param {object} res
 * @param {string} tableName - Table name -> "User", "Topic", etc...
 * @returns {Object} Status 404
 */
const notFound = (res, tableName) => {
  return res.status(404).json({
    success: false,
    message: `Unknown ${tableName}`,
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

module.exports = {
  success,
  successOk,
  successCreated,
  unauthorized,
  notFound,
  servError,
};
