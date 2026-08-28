import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Results() {
  return (
    <>
      <Helmet>
        <title>Results</title>
        <meta name="description" content="Tips of Iron search results" />
      </Helmet>
      <main>
        <section className="search-section">
          <h1>Results</h1>
        </section>
      </main>
    </>
  );
}
