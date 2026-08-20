/**
 * @file api.js
 * @description Link between REACT & Express
 */

const isProd = window.location.hostname !== "localhost";

const apiURL = isProd
  ? "https://https://tips-of-iron.astalg.com/api"
  : "http://localhost:3001/api";

/*================================= AUTH =================================*/
/**
 * @async
 * @function fetchAuth
 * @returns {Promise<Object>} Token || null
 * @description Read Authentication result
 */
export const fetchAuth = async () => {
  const res = await fetch(`${apiURL}/login`);
  return await res.json();
};

/*================================= USER =================================*/
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
 * @param {Object} form - form that contains data to post
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
 * @param {Object} form - form that contains data for update
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

/*================================= CATEGORY =================================*/
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

/*================================= TOPIC =================================*/
/**
 * @async
 * @function fetchTopicByUser
 * @param {String} id - userID
 * @returns {Promise<Object>}
 * @description Read topic by user
 */
export const fetchTopicByUser = async (id) => {
  const res = await fetch(`${apiURL}/topic/user/${id}`);
  return await res.json();
};

/**
 * @async
 * @function fetchTopicByCategory
 * @param {String} id - categoryID
 * @returns {Promise<Object>}
 * @description Read topic by category
 */
export const fetchTopicByCategory = async (id) => {
  const res = await fetch(`${apiURL}/topic/category/${id}`);
  return await res.json();
};

/**
 * @async
 * @function fetchTopic
 * @param {String} title - topic title
 * @returns {Promise<Object>}
 * @description Read topic
 */
export const fetchTopic = async (title) => {
  const res = await fetch(`${apiURL}/topic/${title}`);
  return await res.json();
};

// prettier-ignore
/**
 * @async
 * @function postTopic
 * @param {Object} token - connected user token
 * @param {Object} form - form that contains data to post
 * @returns {Promise<Object>}
 * @description Create Topic
 */
export const postTopic = async (token, form) => {
  const res = await fetch(`${apiURL}/topic`, {
    method: "POST",
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
 * @function patchTopic
 * @param {String} id - topicID
 * @param {Object} token - connected user token
 * @param {Object} form - form that contains data to post
 * @returns {Promise<Object>}
 * @description Update Topic
 */
export const patchTopic = async (id, token, form) => {
  const res = await fetch(`${apiURL}/topic/${id}`, {
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
 * @function deleteTopic
 * @param {String} id - topicID
 * @param {Object} token - connected user token
 * @returns {Promise<Object>}
 * @description Delete Topic
 */
export const deleteTopic = async (id, token) => {
  const res = await fetch(`${apiURL}/topic/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return await res.json();
};
