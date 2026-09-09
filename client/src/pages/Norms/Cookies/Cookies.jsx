import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookies</title>
        <meta name="description" content="Tips of Iron cookies page" />
      </Helmet>
      <main className="norms-theme">
        <section>
          <h1>Cookies</h1>
        </section>
      </main>
    </>
  );
}
