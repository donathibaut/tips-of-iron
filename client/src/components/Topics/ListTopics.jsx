/**
 * @file ListTopics.jsx
 * @description List Topics for Results page
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import topicDeleteHandler from "../../utils/handlers/topicSubmitHandler/topicDeleteHandler";

import "./ListTopics.css";

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
          <Link to={`/topic/${encodeURIComponent(topic.title)}`}>
            {topic.title}
          </Link>
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
  const [deleteTopicID, setDeleteTopicID] = useState(null);

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
    <p className="loading">Loading...</p>
  ) : array[0] !== undefined ? (
    <>
      <table className="myTopics-table">
        <tbody className="myTopics-tbody">
          {array.map((topic) => {
            return (
              <tr key={topic.id_topic} className="myTopics-tr">
                <th scope="row">
                  <Link
                    className="table-btn btn"
                    to={`/topic/${encodeURIComponent(topic.title)}`}
                  >
                    {topic.title}
                  </Link>
                </th>
                <td>
                  <Link
                    to={`/topic-editor/${encodeURIComponent(topic.title)}`}
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
        </tbody>
      </table>

      {/* DELETE CONFIRMATION MODAL */}
      <div
        className="modal fade"
        id="delete-modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p className="modal-txt fs-5" id="modal-txt">
                Confirm deletion
              </p>

              <div className="btn-group">
                <button
                  type="button"
                  className="cancel-btn form-btn"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="delete-confirm-btn form-btn"
                  onClick={(event) => {
                    deleteTopicID !== null &&
                      topicDeleteHandler(
                        event,
                        userID,
                        deleteTopicID,
                        setError,
                      );
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <tr className="no-topic-row">
      <td>No topics created...</td>
    </tr>
  );
}
