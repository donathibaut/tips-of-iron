import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

export default function Home() {
  /* 
    Is SUCCESS MESSAGE ?
    Message DELETED by refresh
  */
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    const txt = localStorage.getItem("successMessage");
    if (txt) {
      setSuccessMessage(txt);
      localStorage.removeItem("successMessage");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Tips of Iron</title>
        <meta
          name="description"
          content="Let's learn something new about Hearts of Iron IV! Tips of Iron is designed to help beginners get the hang of the game!"
        />
      </Helmet>
      <main>
        <section className="search-section">
          <h1>We make Hearts of Iron IV understandable!</h1>

          {
            // SUCCESS MESSAGE
            successMessage && (
              <p className="success-message">{successMessage}</p>
            )
          }

          {/* Search Bar */}
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </section>
        <section className="country-section">
          <ul>Countries List</ul>
        </section>
        <section className="interface-section">
          <ul>Interface List</ul>
        </section>
        <section className="scenarios-section">
          <ul>Scenarios List</ul>
        </section>
      </main>
    </>
  );
}
