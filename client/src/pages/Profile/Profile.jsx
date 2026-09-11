import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

import decodeToken from "../../utils/decodeToken";

import userDeleteHandler from "../../utils/handlers/userSubmitHandler/userDeleteHandler";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./Profile.css";

export default function Profile() {
  const [error, setError] = useState(null);

  const decodedToken = decodeToken();

  return (
    decodedToken && (
      <>
        <Helmet>
          <title>{decodedToken.username}</title>
          <meta name="description" content="Tips of Iron profile page" />
        </Helmet>
        <main className="account-theme">
          <section className="profile-section">
            <h1 className="profile-h1">{decodedToken.username}</h1>

            {/* IS ROLE 1 || 2 ? */}
            {(decodedToken.role === 1 || decodedToken.role === 2) && (
              <Link className="btn neutral-btn" to="/my-topics">
                My topics
              </Link>
            )}

            <Link className="btn neutral-btn" to="/update-user">
              Modify my account
            </Link>

            <button
              type="button"
              className="delete-btn btn"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
            >
              Delete my account
            </button>

            {/* DELETE CONFIRMATION MODAL */}
            <div
              className="modal fade"
              id="delete-modal"
              tabIndex="-1"
              aria-labelledby="modal-txt"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <p className="modal-txt fs-5" id="modal-txt">
                      Confirm deletion
                    </p>

                    <ErrorMessage error={error}></ErrorMessage>

                    <form
                      className="delete-user-form"
                      onSubmit={(event) => {
                        userDeleteHandler(
                          event,
                          decodedToken.id_user,
                          decodedToken.username,
                          setError,
                        );
                      }}
                    >
                      <fieldset>
                        <label htmlFor="password">Password:</label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          required
                          autoComplete="current-password"
                        />
                      </fieldset>

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
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  );
}
