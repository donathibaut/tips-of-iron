import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function LegalNotice() {
  return (
    <>
      <Helmet>
        <title>Legal Notice</title>
        <meta name="description" content="Tips of Iron legal notice page" />
      </Helmet>
      <main className="norms-theme">
        <section>
          <h1>Legal Notice</h1>
        </section>
      </main>
    </>
  );
}
