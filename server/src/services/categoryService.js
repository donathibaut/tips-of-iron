/**
 * @file categoryService.js
 * @description Category CRUD
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

const {
  findAll,
  findOne,
  findByPk,
  create,
  update,
  destroy,
} = require("./basicService");

/*============================================================================*/
/**
 * @async
 * @function categoryFindAll
 * @description Find All Categories || null
 * @param {object} Category - Category Model
 * @returns {Promise<Object|null>}
 */
const categoryFindAll = async (Category) => {
  return await findAll(Category, {
    attributes: { exclude: ["password"] },
  });
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

  if (
    (target.categoryname && target.categoryname !== "") ||
    (target.email && target.email !== "")
  ) {
    const opOr = [];
    if (target.categoryname) opOr.push({ categoryname: target.categoryname });
    if (target.email) opOr.push({ email: target.email });

    return await findOne(Category, {
      where: {
        [Op.or]: opOr,
      },
      attributes: {
        exclude: ["password"],
      },
    });
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
  return await findByPk(Category, id_category, {
    attributes: { exclude: ["password"] },
  });
};

module.exports = {
  categoryFindAll,
  categoryFindOne,
  categoryFindByPk,
};
