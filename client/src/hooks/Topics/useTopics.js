/**
 * @file useTopics.js
 * @description Get Topics for REACT Components
 */

import { useState, useEffect } from "react";
import {
  fetchTopicByCategory,
  fetchTopicByQuery,
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

/*============================================================================*/
/**
 * @function useTopicsByQuery
 * @param {String} query
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topics by title from search query
 */
export function useTopicsByQuery(query) {
  const [topicsByQuery, setTopicsByQuery] = useState([]);
  const [loadingByQuery, setLoadingByQuery] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopicsByQuery
     * @param {String} query
     * @returns {Promise<void>}
     * @description Call API function to FETCH topics by title from search query
     */
    const getTopicsByQuery = async (query) => {
      try {
        if (query !== null && query !== undefined && query.trim() !== "") {
          const data = await fetchTopicByQuery(query);
          if (data.result) {
            setTopicsByQuery(data.result);
          } else {
            setTopicsByQuery([]);
          }
          setLoadingByQuery(false);
        } else {
          setTopicsByQuery([]);
          setLoadingByQuery(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoadingByQuery(false);
      }
    };

    getTopicsByQuery(query);
  }, [query]);

  return { topicsByQuery, loadingByQuery };
}

/*============================================================================*/
/**
 * @function useTopicsByCategory
 * @param {String} category
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topics by Category
 */
export function useTopicsByCategory(category) {
  const [topicsByCategory, setTopicsByCategory] = useState([null]);
  const [loadingByCategory, setLoadingByCategory] = useState(true);

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
        if (category !== null && category !== undefined) {
          const data = await fetchTopicByCategory(category);
          if (data.result) {
            setTopicsByCategory(data.result);
          } else {
            setTopicsByCategory([]);
          }
          setLoadingByCategory(false);
        } else {
          setTopicsByCategory([]);
          setLoadingByCategory(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoadingByCategory(false);
      }
    };

    getTopicsByCategory(category);
  }, [category]);

  return { topicsByCategory, loadingByCategory };
}

/*============================================================================*/
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
