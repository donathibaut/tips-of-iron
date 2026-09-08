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
  const token = localStorage.getItem("token");
  if (token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Token Issue", e);
      return null;
    }
  }
}
