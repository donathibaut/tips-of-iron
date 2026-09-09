import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function Accessibility() {
  return (
    <>
      <Helmet>
        <title>Accessibility</title>
        <meta name="description" content="Tips of Iron accessibility page" />
      </Helmet>
      <main className="norms-theme">
        <section>
          <h1>Accessibility</h1>
        </section>
      </main>
    </>
  );
}
