import { Helmet } from "react-helmet-async";

export default function Topic() {
  return (
    <>
      <Helmet>
        <title>Topic{/* Topic Name */}</title>
        <meta name="description" content="Topic description" />
        {/* Topic Description */}
      </Helmet>
      <main>
        <section>
          <h1>Topic Name</h1>
          {/* Topic Name */}

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          {/* Topic Description */}
        </section>
        {/* Topic Sections */}
      </main>
    </>
  );
}
