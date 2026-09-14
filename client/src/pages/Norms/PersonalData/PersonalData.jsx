import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function PersonalData() {
  return (
    <>
      <Helmet>
        <title>Personal Data</title>
        <meta name="description" content="Tips of Iron personal data page" />
      </Helmet>
      <main className="norms-theme">
        <section className="norms-title">
          <h1>Personal Data</h1>
        </section>

        <section>
          <h2>Data Collection:</h2>
          <p className="collect-data">
            The only personal data collected on Tips of Iron is the information
            you voluntarily provide when creating your account:
            <ul className="collect-data__ul">
              <li>- email address</li>
              <li>- nothing else</li>
            </ul>
          </p>
        </section>
        <section>
          <h2>Purpose:</h2>
          <p>
            This information is strictly used for managing your user account,
            authentication, and publishing your topics or sections on the site.
            No data is sold, traded, or shared with third parties.
          </p>
        </section>
        <section>
          <h2>Your Rights (GDPR):</h2>
          <p>
            In accordance with applicable regulations, you have the right to
            access, correct, and delete your personal data by contacting the
            administrator at:{" "}
            <address>
              <a
                className="norms-link"
                href="mailto:donathibaut02@gmail.com"
                aria-label="Send an Email to the Publication Director"
                target="_blank"
                rel="noopener noreferrer"
              >
                donathibaut02@gmail.com
              </a>
            </address>
            .
          </p>
        </section>
      </main>
    </>
  );
}
