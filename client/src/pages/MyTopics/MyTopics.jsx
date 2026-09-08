import { Helmet } from "react-helmet-async";
import { useTopicsByUser } from "../../hooks/Topics/useTopics";
import decodeToken from "../../utils/decodeToken";

import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { ListMyTopics } from "../../components/Topics/ListTopics";

import "./MyTopics.css";
// Profile page style
import "../Profile/Profile.css";

export default function MyTopics() {
  const decodedToken = decodeToken();

  // LIST TOPICS
  const { topics, loading } = useTopicsByUser(decodedToken.id_user);

  return (
    <>
      <Helmet>
        <title>My Topics</title>
        <meta name="description" content="Tips of Iron search results" />
      </Helmet>
      <main className="account-theme">
        <section className="title-section">
          <h1>My Topics</h1>

          <SuccessMessage></SuccessMessage>

          <div className="table-container">
            <table className="myTopics-table">
              <tbody className="myTopics-tbody">
                <ListMyTopics array={topics} loading={loading}></ListMyTopics>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
