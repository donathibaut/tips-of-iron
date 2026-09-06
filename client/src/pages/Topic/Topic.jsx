import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { useTopic } from "../../hooks/Topics/useTopics";

export default function Topic() {
  // GET search param
  const { title } = useParams();

  const { topic, loading } = useTopic(title);

  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    <>
      <Helmet>
        <title>{topic.title}</title>
        <meta name="description" content="Topic description" />
        {/* Topic Description */}
      </Helmet>
      <main>
        <section className="topic-section">
          <SuccessMessage></SuccessMessage>

          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
        </section>
        {topic.sections &&
          topic.sections.map((section) => (
            <section
              key={section.id_section}
              className={`section-${section.id_section}`}
            >
              <h2>{section.title}</h2>

              {section.image_path && section.image_path !== "" && (
                <img src={section.image_path} alt="section illustration" />
              )}

              <p>{section.text}</p>
            </section>
          ))}
      </main>
    </>
  );
}
