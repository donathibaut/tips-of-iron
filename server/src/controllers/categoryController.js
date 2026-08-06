/**
 * @file categoryController.js
 * @description Category CRUD Controller
 */

const Category = require("../models/Category");
const tableName = "Category";

const { categoryFindAll } = require("../services/categoryService");

const { successOk, notFound, errorBlock } = require("../utils/status");

/*============================================================================*/
/**
 * @async
 * @function getCategories
 * @description Controller : Read All Categories
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} Categories Data || null
 */
const getCategories = async (req, res) => {
  try {
    const categories = await categoryFindAll(Category);

    if (categories === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, categories);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getCategories,
};
