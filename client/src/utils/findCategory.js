/**
 * @file findCategory.js
 * @description Find category name by id from categories array
 */

/**
 * @function findCategory
 * @description Find category name by id
 * @param {Number} id
 * @param {Array} categories - list of categories
 * @returns {String} category name
 */
export default function findCategory(id, categories) {
  const find = categories.find((key) => key.id_category === id);
  return find ? find.name : "DATA ERROR";
}
