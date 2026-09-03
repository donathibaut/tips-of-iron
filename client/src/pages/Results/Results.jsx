import { Helmet } from "react-helmet-async";
import { useParams, useSearchParams } from "react-router-dom";

import {
  useTopicsByQuery,
  useTopicsByCategory,
} from "../../hooks/Topics/useTopics";

import { ListTopics } from "../../components/Topics/ListTopics";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Results() {
  // category <Link> from Nav component
  const { category } = useParams();

  // topic search from search bar
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // LIST TOPICS
  const { topicsByQuery, loadingByQuery } = useTopicsByQuery(searchQuery);
  const { topicsByCategory, loadingByCategory } = useTopicsByCategory(category);

  // PREVENT "ListTopics.jsx" from displaying an empty "topicsByQuery" array
  const array = searchQuery ? topicsByQuery : topicsByCategory;
  const loading = searchQuery ? loadingByQuery : loadingByCategory;

  return (
    <>
      <Helmet>
        <title>{(searchQuery || category) + "..."}</title>
        <meta name="description" content="Tips of Iron search results" />
      </Helmet>
      <main>
        <section className="search-section">
          <h1>Results for: "{searchQuery || category}"</h1>

          <SearchBar></SearchBar>
        </section>

        <section className="results-section">
          <ul>
            <ListTopics array={array} loading={loading}></ListTopics>
          </ul>
        </section>
      </main>
    </>
  );
}
