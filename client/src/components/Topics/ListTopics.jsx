/**
 * @file ListTopics.jsx
 * @description List Topics for Results page
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import topicDeleteHandler from "../../utils/handlers/topicSubmitHandler/topicDeleteHandler";

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
  ) : array.length !== 0 ? (
    array.map((topic) => {
      return (
        <li key={topic.id_topic}>
          <Link to={`/topic/${topic.title}`}>{topic.title}</Link>
        </li>
      );
    })
  ) : (
    <p className="no-results">"No results..."</p>
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
  const [error, setError] = useState(null);
  let [deleteTopicID, setDeleteTopicID] = useState(null);

  if (error !== null) {
    console.error(error);
  }

  // get token
  const token = localStorage.getItem("token");
  // DECODE Base64 token to access token role (for example)
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      console.error("Token Issue", e);
    }
  }
  const userID = decodedToken ? decodedToken.id_user : null;

  return loading ? (
    <tr className="loading">
      <td>Loading...</td>
    </tr>
  ) : (
    <>
      {array.map((topic) => {
        return (
          <tr key={topic.id_topic} className="myTopics-tr">
            <th scope="row">
              <Link className="table-btn btn" to={`/topic/${topic.title}`}>
                {topic.title}
              </Link>
            </th>
            <td>
              <Link
                to={`/topic-editor/${topic.title}`}
                className="table-btn btn"
              >
                Update
              </Link>
            </td>
            <td>
              <button
                type="button"
                className="btn table-delete"
                data-bs-toggle="modal"
                data-bs-target="#delete-modal"
                onClick={() => {
                  setDeleteTopicID(topic.id_topic);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}

      {/* DELETE CONFIRMATION MODAL */}
      <div
        class="modal fade"
        id="delete-modal"
        tabindex="-1"
        aria-labelledby="modal-txt"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <p class="modal-txt fs-5" id="modal-txt">
                Confirm deletion
              </p>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="delete-btn btn btn-primary"
                onClick={(event) => {
                  deleteTopicID !== null &&
                    topicDeleteHandler(event, userID, deleteTopicID, setError);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
