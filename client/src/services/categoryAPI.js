/**
 * @file categoryAPI.js
 * @description category API call
 */

import { apiURL } from "./config/config";

/**
 * @async
 * @function fetchCategories
 * @returns {Promise<Object>}
 * @description fetch all categories
 */
export const fetchCategories = async () => {
  const res = await fetch(`${apiURL}/category`);
  return await res.json();
};
