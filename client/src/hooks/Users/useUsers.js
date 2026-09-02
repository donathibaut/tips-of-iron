/**
 * @file useUsers.js
 * @description Get Users for REACT Components
 */

import { useState, useEffect } from "react";

import { fetchUser } from "../../services/userAPI";

/**
 * @function useUserByID
 * @param {Number} userID
 * @returns {Array} user
 * @returns {Boolean} loading
 * @description Get User by ID
 */
export function useUserByID(userID) {
  const [user, setUser] = useState([null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * @async
     * @function getTopicsByUser
     * @param {Number} userID
     * @returns {Promise<void>}
     * @description Call API function to FETCH User by ID
     */
    const getUserByID = async (userID) => {
      try {
        if (userID) {
          const data = await fetchUser(userID);
          if (data.result) {
            setUser(data.result);
          } else {
            setUser([]);
          }
          setLoading(false);
        } else {
          setUser([]);
          setLoading(false);
        }
      } catch (e) {
        console.error("Request Failed:", e);
        setLoading(false);
      }
    };

    getUserByID(userID);
  }, [userID]);

  return { user, loading };
}
