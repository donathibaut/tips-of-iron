/**
 * @file categoryService.js
 * @description Category CRUD
 */

const { findAll, findOne, findByPk } = require("./basicService");

/*============================================================================*/
/**
 * @async
 * @function categoryFindAll
 * @description Find All Categories (id -> ASC order) || null
 * @param {object} Category - Category Model
 * @returns {Promise<Object|null>}
 */
const categoryFindAll = async (Category) => {
  return await findAll(Category, { order: [["id_category", "ASC"]] });
};

/*============================================================================*/
/**
 * @async
 * @function categoryFindOne
 * @description Find One Category || null
 * @param {object} Category - Category Model
 * @param {object} target - searched category
 * @returns {Promise<Object|null>}
 */
const categoryFindOne = async (Category, target) => {
  if (!target) {
    return null;
  }

  if (target.name && target.name !== "") {
    return await findOne(Category, { where: { name: target.name } });
  } else {
    return null;
  }
};

/*============================================================================*/
/**
 * @async
 * @function categoryFindByPk
 * @description Find Category By ID || null
 * @param {object} Category - Category Model
 * @param {number} id_category
 * @returns {Promise<Object|null>}
 */
const categoryFindByPk = async (Category, id_category) => {
  return await findByPk(Category, id_category);
};

module.exports = {
  categoryFindAll,
  categoryFindOne,
  categoryFindByPk,
};
