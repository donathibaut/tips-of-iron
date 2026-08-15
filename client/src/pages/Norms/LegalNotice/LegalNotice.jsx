import { Helmet } from "react-helmet-async";

export default function LegalNotice() {
  return (
    <>
      <Helmet>
        <title>Legal Notice</title>
        <meta name="description" content="Tips of Iron legal notice page" />
      </Helmet>
      <main>
        <section>
          <h1>Legal Notice</h1>
        </section>
      </main>
    </>
  );
}
