/**
 * @file ListCategories.jsx
 * @description List Categories for navigation
 */

import { Link } from "react-router-dom";
import togglerLink from "../../utils/togglerLink";

/**
 * @function ListCategories
 * @param {Object} props
 * @prop {Array} props.array
 * @prop {Boolean} props.loading - is loading ?
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
          <Link
            to={`/results/categories/${encodeURIComponent(category.name)}`}
            onClick={togglerLink}
          >
            {category.name}
          </Link>
        </li>
      );
    })
  );
}

/**
 * @function SelectCategories
 * @param {Object} props
 * @param {Array} props.array
 * @param {Boolean} props.loading - is loading ?
 * @returns {JSX.Element}
 * @description List Categories for <option> markups
 */
export function SelectCategories({ array, loading }) {
  return loading ? (
    <option value="" className="loading">
      Loading...
    </option>
  ) : (
    array.map((category) => {
      return (
        <option value={category.name} key={category.id_category}>
          {category.name}
        </option>
      );
    })
  );
}
