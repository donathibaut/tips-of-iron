import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import removeSection from "../../../utils/removeSection";
import findCategory from "../../../utils/findCategory";
import addSectionFromTopic from "../../../utils/addSectionFromTopic";

import useCategories from "../../../hooks/Categories/useCategories";
import { useTopic } from "../../../hooks/Topics/useTopics";

import sectionAddHandler from "../../../utils/handlers/sectionSubmitHandler/sectionAddHandler";
import topicCreateHandler from "../../../utils/handlers/topicSubmitHandler/topicCreateHandler";
import sectionOnChangeHandler from "../../../utils/handlers/sectionSubmitHandler/sectionOnChangeHandler";

import { SelectCategories } from "../../../components/Categories/ListCategories";
import FieldsetSection from "../../../components/Sections/FieldsetSection";

export default function TopicEditor() {
  const { title } = useParams();

  const [error, setError] = useState(null);

  // get token
  const token = localStorage.getItem("token");
  // DECODE Base64 token to access token role (for example)
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      console.error("Token Issue", e);
    }
  }
  const id_user = decodedToken ? decodedToken.id_user : null;

  // LIST CATEGORIES
  const { categories, loading: categoriesLoading } = useCategories();

  // SECTIONS
  const [sections, setSections] = useState([]);

  // user input for onChange attr
  const [userInput, setUserInput] = useState("");

  // UPDATE: selected TOPIC
  const { topic, loading: topicLoading } = useTopic(title);
  const topicSections = topic.sections;

  // UPDATE: generate sections
  useEffect(() => {
    if (topic) {
      addSectionFromTopic(topicSections, setSections, setError);
    }
  }, [topic]);

  return topicLoading ? (
    <li className="loading">Loading...</li>
  ) : (
    <>
      <Helmet>
        <title>Topic Editor</title>
        <meta name="description" content="Tips of Iron topic edition page" />
      </Helmet>
      <main>
        <section>
          {title ? <h1>Update Topic</h1> : <h1>Create a new Topic</h1>}

          {
            // ERROR MESSAGE
            error !== null && <p className="error-message">{error}</p>
          }

          <form
            onSubmit={(event) => {
              topicCreateHandler(event, sections, id_user, setError);
            }}
          >
            <fieldset>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={topic.title ? topic.title : ""}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
              <label htmlFor="description">Global Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                required
                value={topic.description ? topic.description : ""}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />
              <label htmlFor="category">Category:</label>
              <select name="category" id="category" required>
                {topic.id_category ? (
                  <option value={findCategory(topic.id_category, categories)}>
                    {findCategory(topic.id_category, categories)}
                  </option>
                ) : (
                  <option value="">--Choose a category--</option>
                )}

                {/* Dynamic options */}
                <SelectCategories
                  array={categories}
                  loading={categoriesLoading}
                ></SelectCategories>
              </select>
            </fieldset>

            {/* SECTIONS Fieldsets mapped for sectionAddHandler function */}
            {sections.map((object, index) => {
              return (
                <FieldsetSection
                  key={object.fieldID}
                  index={index}
                  section={object}
                  remove={(event) =>
                    removeSection(
                      event,
                      sections,
                      setSections,
                      setError,
                      object.fieldID,
                    )
                  }
                  onChange={(inputName, inputValue) =>
                    sectionOnChangeHandler(
                      sections,
                      setSections,
                      object.fieldID,
                      inputName,
                      inputValue,
                    )
                  }
                ></FieldsetSection>
              );
            })}

            {/* Create object mapped in FieldSection function */}
            <button
              onClick={(event) => {
                sectionAddHandler(event, setSections, setError);
              }}
            >
              Add section
            </button>

            <button type="submit">Submit</button>
            <Link to="/">Cancel</Link>
          </form>
        </section>
      </main>
    </>
  );
}
