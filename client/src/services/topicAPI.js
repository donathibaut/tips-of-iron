/**
 * @file topicAPI.js
 * @description topic API call
 */

import { apiURL } from "./config/config";

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
 * @param {Object} form - contain data to post
 * @returns {Promise<Object>}
 * @description Create Topic
 */
export const postTopic = async (form) => {
  const token = localStorage.getItem("token");

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
 * @param {Object} form - contain data to post
 * @returns {Promise<Object>}
 * @description Update Topic
 */
export const patchTopic = async (id, form) => {
  const token = localStorage.getItem("token");

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
 * @returns {Promise<Object>}
 * @description Delete Topic
 */
export const deleteTopic = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${apiURL}/topic/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return await res.json();
};
