/**
 * @file useTopics.js
 * @description Get Topics for REACT Components
 */

import { useState, useEffect } from "react";
import { fetchTopicByCategory } from "../../services/topicAPI";

/**
 * @function useTopicsByCategory
 * @returns {Array} topics
 * @returns {Boolean} loading
 * @description Get Topics by Category
 */
export function useTopicsByCategory(category) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopicsByCategory
     * @returns {Promise<void>}
     * @description Call API function to FETCH topics by Category
     */
    const getTopicsByCategory = async (category) => {
      try {
        const data = await fetchTopicByCategory(category);
        if (data.result) {
          setTopics(data.result);
        } else {
          setTopics([]);
        }
        setLoading(false);
      } catch (e) {
        console.error("Request Failed :", e);
        setLoading(false);
      }
    };

    getTopicsByCategory(category);
  }, [category]);

  return { topics, loading };
}
