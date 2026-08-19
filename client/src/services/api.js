/**
 * @file api.js
 * @description Link between REACT & Express
 */

const isProd = window.location.hostname !== "localhost";

const apiURL = isProd
  ? "https://https://tips-of-iron.astalg.com/api"
  : "http://localhost:3001/api";

/*============================================================================*/
/**
 * @async
 * @function fetchAuth
 * @returns {Promise<Object>} Token || null
 * @description Read the Authentication result
 */
export const fetchAuth = async () => {
  const res = await fetch(`${apiURL}/login`);
  return await res.json();
};

/*============================================================================*/
/**
 * @async
 * @function fetchUser
 * @param {String} id - userID
 * @returns {Promise<Object>} User Data || null
 * @description Read a user
 */
export const fetchUser = async (id) => {
  const res = await fetch(`${apiURL}/user/${id}`);
  return await res.json();
};

/**
 * @async
 * @function createUser
 * @returns {Promise<Object>} null
 * @description Create a user
 */
export const createUser = async () => {
  const res = await fetch(`${apiURL}/user`, {
    method: "CREATE",
  });
  return await res.json();
};

/*============================================================================*/
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

/*============================================================================*/
/**
 * @async
 * @function fetchTopic
 * @param {String} id - topicID
 * @returns {Promise<Object>}
 * @description
 */
export const fetchTopic = async (id) => {
  const res = await fetch(`${apiURL}/topic/${id}`);
  return await res.json();
};
