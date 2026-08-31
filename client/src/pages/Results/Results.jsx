import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import { useTopicsByCategory } from "../../hooks/Topics/useTopics";
import { ListTopics } from "../../components/Topics/ListTopics";

export default function Results() {
  // GET search param
  const { search } = useParams();

  // LIST TOPICS
  const { topics, loading } = useTopicsByCategory(search);

  return (
    <>
      <Helmet>
        <title>{search + "..."}</title>
        <meta name="description" content="Tips of Iron search results" />
      </Helmet>
      <main>
        <section className="search-section">
          <h1>Results for: "{search}"</h1>

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

        <section className="results-section">
          <ul>
            <ListTopics array={topics} loading={loading}></ListTopics>
          </ul>
        </section>
      </main>
    </>
  );
}
