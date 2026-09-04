import { Helmet } from "react-helmet-async";
import { useTopicsByUser } from "../../hooks/Topics/useTopics";
import { useEffect, useState } from "react";
import decodeToken from "../../utils/decodeToken";

import { ListMyTopics } from "../../components/Topics/ListTopics";

export default function MyTopics() {
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

  const decodedToken = decodeToken();

  // LIST TOPICS
  const { topics, loading } = useTopicsByUser(decodedToken.id_user);

  return (
    <>
      <Helmet>
        <title>My Topics</title>
        <meta name="description" content="Tips of Iron search results" />
      </Helmet>
      <main>
        <section className="title-section">
          <h1>My Topics</h1>

          {
            // SUCCESS MESSAGE
            successMessage && (
              <p className="success-message">{successMessage}</p>
            )
          }
        </section>
        <section className="results-section">
          <table>
            <tbody>
              <ListMyTopics array={topics} loading={loading}></ListMyTopics>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
