/**
 * @file useTopics.js
 * @description Get Topics for REACT Components
 */

import { useState, useEffect } from "react";
import {
  fetchTopicByCategory,
  fetchTopic,
  fetchTopicByUser,
} from "../../services/topicAPI";

/**
 * @function useTopic
 * @param {String} title
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topic by title
 */
export function useTopic(title) {
  const [topic, setTopics] = useState([null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopic
     * @param {String} title
     * @returns {Promise<void>}
     * @description Call API function to FETCH topic
     */
    const getTopic = async (title) => {
      try {
        if (title) {
          const data = await fetchTopic(title);
          if (data.result) {
            setTopics(data.result);
          } else {
            setTopics([]);
          }
          setLoading(false);
        } else {
          setTopics([]);
          setLoading(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoading(false);
      }
    };

    getTopic(title);
  }, [title]);

  return { topic, loading };
}

/**
 * @function useTopicsByCategory
 * @param {String} category
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topics by Category
 */
export function useTopicsByCategory(category) {
  const [topics, setTopics] = useState([null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopicsByCategory
     * @param {String} category
     * @returns {Promise<void>}
     * @description Call API function to FETCH topics by Category
     */
    const getTopicsByCategory = async (category) => {
      try {
        if (category) {
          const data = await fetchTopicByCategory(category);
          if (data.result) {
            setTopics(data.result);
          } else {
            setTopics([]);
          }
          setLoading(false);
        } else {
          setTopics([]);
          setLoading(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoading(false);
      }
    };

    getTopicsByCategory(category);
  }, [category]);

  return { topics, loading };
}

/**
 * @function useTopicsByUser
 * @param {Number} userID
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topics by User
 */
export function useTopicsByUser(userID) {
  const [topics, setTopics] = useState([null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopicsByUser
     * @param {Number} userID
     * @returns {Promise<void>}
     * @description Call API function to FETCH topics by User
     */
    const getTopicsByUser = async (userID) => {
      try {
        if (userID) {
          const data = await fetchTopicByUser(userID);
          if (data.result) {
            setTopics(data.result);
          } else {
            setTopics([]);
          }
          setLoading(false);
        } else {
          setTopics([]);
          setLoading(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoading(false);
      }
    };

    getTopicsByUser(userID);
  }, [userID]);

  return { topics, loading };
}
