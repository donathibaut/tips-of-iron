/**
 * @file categoryAPI.js
 * @description category API call
 */

import { apiURL } from "./config/config";

/**
 * @async
 * @function fetchCategory
 * @returns {Promise<Object>}
 * @description
 */
export const fetchCategory = async () => {
  const res = await fetch(`${apiURL}/category`);
  return await res.json();
};
