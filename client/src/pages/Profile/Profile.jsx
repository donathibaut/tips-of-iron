import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";

import decodeToken from "../../utils/decodeToken";

import userDeleteHandler from "../../utils/handlers/userSubmitHandler/userDeleteHandler";

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
        <main>
          <section className="profile-section">
            <h1>{decodedToken.username}</h1>
          </section>

          {/* IS ROLE 1 || 2 ? */}
          {(decodedToken.role === 1 || decodedToken.role === 2) && (
            <section className="my-topics-section">
              <Link to="/my-topics">My topics</Link>
            </section>
          )}

          <section className="modify-account-section">
            <Link to="/update-user">Modify my account</Link>
          </section>
          <section className="deleteAccount-section">
            <button
              type="button"
              class="delete-btn btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#delete-modal"
            >
              Delete my account
            </button>

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

                    {
                      //ERROR MESSAGE
                      error !== null && <p className="error-message">{error}</p>
                    }

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
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required
                      />

                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>

                      <button type="submit" class="delete-btn btn btn-primary">
                        Delete
                      </button>
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
