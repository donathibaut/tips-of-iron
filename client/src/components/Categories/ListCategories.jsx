/**
 * @file ListCategories.jsx
 * @description List Categories for navigation
 */

import { Link } from "react-router-dom";

/**
 * @function ListCategories
 * @param {Array} array
 * @param {Boolean} loading - is loading ?
 * @returns {JSX.Element}
 * @description List Categories with <Link> markups
 */
export function ListCategories({ array, loading }) {
  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    array.map((category) => {
      return (
        <li key={category.id_category}>
          <Link to={`/${category.name}`}>{category.name}</Link>
        </li>
      );
    })
  );
}

/**
 * @function SelectCategories
 * @param {Array} array
 * @param {Boolean} loading - is loading ?
 * @returns {JSX.Element}
 * @description List Categories for <option> markups
 */
export function SelectCategories({ array, loading }) {
  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    array.map((category) => {
      return (
        <li key={category.id_category}>
          <Link to={`/${category.name}`}>{category.name}</Link>
        </li>
      );
    })
  );
}
