/**
 * @file useCategories.js
 * @description Get Categories for REACT Components
 */

import { useState, useEffect } from "react";
import { fetchCategories } from "../../services/categoryAPI";

/**
 * @function useCategories
 * @returns {Array} categories
 * @returns {Boolean} loading
 * @description Get Categories for REACT Components
 */
export default function useCategories() {
  const [categories, setCategories] = useState([null]);
  const [loading, setLoading] = useState(true);

  /**
   * @async
   * @function getCategories
   * @returns {Promise<void>}
   * @description Call API function to FETCH categories
   */
  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      if (data.result) {
        setCategories(data.result);
      } else {
        setCategories([]);
      }
      setLoading(false);
    } catch (e) {
      console.error("Request Failed:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading };
}
