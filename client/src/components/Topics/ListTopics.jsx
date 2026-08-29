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
export default function ListTopics({ array, loading }) {
  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    array.map((topic) => {
      return (
        <li key={topic.id_topic}>
          <Link to={`/results/${topic.title}`}>{topic.title}</Link>
        </li>
      );
    })
  );
}
