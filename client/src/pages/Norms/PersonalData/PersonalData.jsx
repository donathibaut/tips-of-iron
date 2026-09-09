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
        <section>
          <h1>Personal Data</h1>
        </section>
      </main>
    </>
  );
}
