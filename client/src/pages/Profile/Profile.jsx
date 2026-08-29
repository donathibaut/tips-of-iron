import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import decodeToken from "../../utils/decodeToken";

export default function Profile() {
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
            <section className="myTopics-section">
              <Link>My topics</Link>
            </section>
          )}

          <section className="modifyAccount-section">
            <Link>Modify my account</Link>
          </section>
          <section className="deleteAccount-section">
            <Link>Delete my account</Link>
          </section>
        </main>
      </>
    )
  );
}
