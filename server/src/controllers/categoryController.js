/**
 * @file categoryController.js
 * @description Category CRUD Controller
 */

const Category = require("../models/Category");
const tableName = "Category";

const { categoryFindByPk } = require("../services/categoryService");
const { successOk, notFound, errorBlock } = require("../utils/status");

/*============================================================================*/
/**
 * @async
 * @function getCategoryById
 * @description Controller : Read Category
 * @param {Object} req - Targeted category ID
 * @param {Object} res
 * @returns {Promise<void>} Category Data || null
 */
const getCategoryById = async (req, res) => {
  try {
    const id_category = req.params.id_category;

    const category = await categoryFindByPk(Category, id_category);

    if (category === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, category);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getCategoryById,
};
