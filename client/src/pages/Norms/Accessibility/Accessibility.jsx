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
        <section className="norms-title">
          <h1>Accessibility</h1>
        </section>

        <section>
          <h2>Commitment:</h2>
          <p>
            Tips of Iron is committed to making its consultation and
            guide-writing interface as accessible and seamless as possible for
            all users.
          </p>
        </section>
        <section>
          <h2>Design:</h2>
          <p>
            The site was developed with careful attention to color contrast,
            font readability, and a structured modular layout.
          </p>
        </section>
        <section>
          <h2>Continuous Improvement:</h2>
          <p>
            This website is in continuous improvement and always takes
            accessibility into consideration.
          </p>
        </section>
      </main>
    </>
  );
}
