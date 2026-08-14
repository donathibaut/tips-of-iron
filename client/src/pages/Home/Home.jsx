import { Helmet } from "react-helmet-async";

export default function Home() {
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
        <section className="searchSection">
          <h1>We make Hearts of Iron IV understandable!</h1>
          {/* Search Bar */}
          <form class="form-inline">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </section>
        <section className="countrySection">
          <ul>Countries List</ul>
        </section>
        <section className="interfaceSection">
          <ul>Interface List</ul>
        </section>
        <section className="scenarioSection">
          <ul>Scenarios List</ul>
        </section>
      </main>
    </>
  );
}
