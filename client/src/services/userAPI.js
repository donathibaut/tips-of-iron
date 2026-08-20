/**
 * @file userAPI.js
 * @description user API call
 */

import { apiURL } from "./config/config";

/**
 * @async
 * @function fetchUser
 * @param {String} id - userID
 * @returns {Promise<Object>} User Data || null
 * @description Read user
 */
export const fetchUser = async (id) => {
  const res = await fetch(`${apiURL}/user/${id}`);
  return await res.json();
};

/**
 * @async
 * @function postUser
 * @param {Object} form - contain data to post
 * @returns {Promise<Object>} null
 * @description Create user
 */
export const postUser = async (form) => {
  const res = await fetch(`${apiURL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return await res.json();
};

// prettier-ignore
/**
 * @async
 * @function patchUser
 * @param {String} id - userID
 * @param {Object} token - connected user token
 * @param {Object} form - contain data for update
 * @returns {Promise<Object>} null
 * @description Update user
 */
export const patchUser = async (id, token, form) => {
  const res = await fetch(`${apiURL}/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  });
  return await res.json();
};

// prettier-ignore
/**
 * @async
 * @function deleteUser
 * @param {String} id - userID
 * @param {Object} token - connected user token
 * @returns {Promise<Object>} null
 * @description Delete user
 */
export const deleteUser = async (id, token) => {
  const res = await fetch(`${apiURL}/user/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  return await res.json();
};
