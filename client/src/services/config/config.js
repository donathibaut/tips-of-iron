/**
 * @file config.js
 * @description Config for API call
 */

const isProd = window.location.hostname !== "localhost";

/**
 * @function apiURL
 * @returns {String}
 * @description Define API URL
 */
export const apiURL = isProd
  ? "https://tips-of-iron.astalg.com/api"
  : "http://localhost:3001/api";
