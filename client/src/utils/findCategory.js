/**
 * @file findCategory.js
 * @description GET category name by id
 */

/**
 * @function findCategory
 * @description GET category name by id
 * @param {Number} id
 * @param {Array} categories
 * @returns {String} category name
 */
export default function findCategory(id, categories) {
  const find = categories.find((key) => key.id_category === id);
  return find ? find.name : "DATA ERROR";
}
