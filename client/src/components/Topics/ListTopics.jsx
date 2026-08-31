/**
 * @file ListTopics.jsx
 * @description List Topics for Results page
 */

import { Link } from "react-router-dom";

/**
 * @function ListTopics
 * @param {Object} props
 * @prop {Array} props.array
 * @prop {Boolean} props.loading - is loading ?
 * @returns {JSX.Element}
 * @description List Topics with <Link> markups
 */
export function ListTopics({ array, loading }) {
  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    array.map((topic) => {
      return (
        <li key={topic.id_topic}>
          <Link to={`/topic/${topic.title}`}>{topic.title}</Link>
        </li>
      );
    })
  );
}

/**
 * @function ListMyTopics
 * @param {Object} props
 * @prop {Array} props.array
 * @prop {Boolean} props.loading - is loading ?
 * @returns {JSX.Element}
 * @description List my Topics with table rows (update & delete options)
 */
export function ListMyTopics({ array, loading }) {
  return loading ? (
    <tr className="loading">
      <td>Loading...</td>
    </tr>
  ) : (
    array.map((topic) => {
      return (
        <tr key={topic.id_topic}>
          <th scope="row">
            <Link to={`/topic/${topic.title}`}>{topic.title}</Link>
          </th>
          <td>
            <Link to={`/topic-editor/${topic.title}`} className="update-link">
              Update
            </Link>
          </td>
          <td>
            <button type="submit" className="delete-link">
              Delete
            </button>
          </td>
        </tr>
      );
    })
  );
}
