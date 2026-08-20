/**
 * @file authAPI.js
 * @description auth API call
 */

import { apiURL } from "./config/config";

/**
 * @async
 * @function postAuth
 * @param {Object} form - contain data to post
 * @returns {Promise<Object>} Token || null
 * @description Create Token
 */
export const postAuth = async (form) => {
  const res = await fetch(`${apiURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return await res.json();
};
