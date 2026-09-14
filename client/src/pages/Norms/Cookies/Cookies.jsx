import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookies</title>
        <meta name="description" content="Tips of Iron personal data page" />
      </Helmet>
      <main className="norms-theme">
        <section className="norms-title">
          <h1>Cookies</h1>
        </section>

        <section>
          <h2>Local Storage:</h2>
          <p>
            The site uses the browser's localStorage exclusively to keep you
            logged in and manage your active user session. No tracking cookies
            or third-party analytical storage are used.
          </p>
        </section>
      </main>
    </>
  );
}
