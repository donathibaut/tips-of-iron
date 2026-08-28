import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Tips of Iron profile page" />
      </Helmet>
      <main>
        <section className="profile-section">
          <h1>Profile</h1>
        </section>
        <section className="myTopics-section">
          <Link>My topics</Link>
        </section>
        <section className="modifyAccount-section">
          <Link>Modify my account</Link>
        </section>
        <section className="deleteAccount-section">
          <Link>Delete my account</Link>
        </section>
      </main>
    </>
  );
}
