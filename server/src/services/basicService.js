/**
 * @file basicService.js
 * @description basic functions for the Service files
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Op } = require("sequelize");

/**
 * @async
 * @function findAll
 * @param {string} modelName
 * @returns {Promise<Object|null>}
 * @description Return all data from the table || null
 */
const findAll = async (modelName) => {
  if (modelName) {
    return await modelName.findAll();
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function findByPk
 * @param {string} modelName
 * @param {number} id
 * @returns {Promise<Object|null>}
 * @description Find data by id || null
 */
const findByPk = async (modelName, id) => {
  if (modelName) {
    if (id) {
      return await modelName.findByPk(id);
    } else {
      throw new Error("User Not Found");
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

module.exports = {
  findAll,
  findByPk,
};
