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

            {
              //ERROR MESSAGE
              error !== null && <p className="error-message">{error}</p>
            }
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
            <form
              onSubmit={(event) => {
                userDeleteHandler(
                  event,
                  decodedToken.id_user,
                  decodedToken.username,
                  setError,
                );
              }}
            >
              <button type="submit" className="delete-btn">
                Delete my account
              </button>
            </form>
          </section>
        </main>
      </>
    )
  );
}
