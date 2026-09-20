/**
 * @file decodeToken.js
 * @description DECODE Base64 token
 */
import { jwtDecode } from "jwt-decode";

/**
 * @function decodeToken
 * @returns {Object|null} token
 * @description DECODE Base64 token
 */
export default function decodeToken() {
  const localToken = localStorage.getItem("token");
  if (!localToken) {
    console.log("There is no token...");
    return null;
  }

  if (localToken) {
    try {
      const token = jwtDecode(localToken);

      // is token expired
      if (token.exp && token.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        console.log("EXPIRED TOKEN");
        return null;
      }

      return token;
    } catch (e) {
      localStorage.removeItem("token");
      console.error("Token Issue", e);
      return null;
    }
  }
}
