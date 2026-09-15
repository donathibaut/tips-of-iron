import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import decodeToken from "../../../utils/decodeToken";
import removeSection from "../../../utils/removeSection";
import findCategory from "../../../utils/findCategory";
import addSectionFromTopic from "../../../utils/addSectionFromTopic";

import useCategories from "../../../hooks/Categories/useCategories";
import { useTopic } from "../../../hooks/Topics/useTopics";

import sectionAddHandler from "../../../utils/handlers/sectionSubmitHandler/sectionAddHandler";
import topicCreateHandler from "../../../utils/handlers/topicSubmitHandler/topicCreateHandler";
import sectionOnChangeHandler from "../../../utils/handlers/sectionSubmitHandler/sectionOnChangeHandler";
import topicUpdateHandler from "../../../utils/handlers/topicSubmitHandler/topicUpdateHandler";

import { SelectCategories } from "../../../components/Categories/ListCategories";
import FieldsetSection from "../../../components/Sections/FieldsetSection";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

import "./TopicEditor.css";
// Topic page style
import "../../Topic/Topic.css";

export default function TopicEditor() {
  const { title } = useParams();

  const [error, setError] = useState(null);

  const decodedToken = decodeToken();
  const userID = decodedToken ? decodedToken.id_user : null;

  // LIST CATEGORIES
  const { categories, loading: categoriesLoading } = useCategories();

  // SECTIONS
  const [sections, setSections] = useState([]);

  // user input for onChange attr
  const [userInput, setUserInput] = useState("");
  console.log(userInput);

  // UPDATE: selected TOPIC
  let { topic, loading: topicLoading } = useTopic(title);
  console.log(topic);
  const topicID = topic.id_topic;
  let topicSections = topic.sections;
  if (!title) {
    topic = null;
    topicSections = null;
  }

  // UPDATE: generate sections
  useEffect(() => {
    if (topicSections) {
      addSectionFromTopic(topicSections, setSections, setError);
    }
  }, [topicSections]);

  // Avoid update sections still in creation form
  useEffect(() => {
    if (!title) {
      setSections([]);
    }
  }, [title]);

  return topicLoading ? (
    <li className="loading">Loading...</li>
  ) : (
    <>
      <Helmet>
        <title>Topic Editor</title>
        <meta name="description" content="Tips of Iron topic edition page" />
      </Helmet>
      <main className="topic-theme">
        <section className="topic-section">
          {title ? <h1>Update Topic</h1> : <h1>Create a new Topic</h1>}

          <ErrorMessage error={error}></ErrorMessage>

          <form
            className="editor-form"
            onSubmit={(event) => {
              if (!title) {
                topicCreateHandler(event, sections, userID, setError);
              } else {
                topicUpdateHandler(event, sections, userID, topicID, setError);
              }
            }}
          >
            <fieldset className="topic-fieldset">
              <label htmlFor="title">Title:</label>
              <input
                key={topic?.title ?? "new-title"}
                type="text"
                id="title"
                name="title"
                maxLength="100"
                required
                autoComplete="off"
                defaultValue={topic && topic.title ? topic.title : ""}
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />

              <label htmlFor="description">Global Description:</label>
              <textarea
                key={topic?.description ?? "new-description"}
                id="description"
                name="description"
                rows="3"
                autoComplete="off"
                defaultValue={
                  topic && topic.description ? topic.description : ""
                }
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
                required
              ></textarea>

              <div className="category-container">
                <label htmlFor="category">Category:</label>

                <select
                  name="category"
                  id="category"
                  required
                  autoComplete="off"
                  defaultValue={
                    topic && topic.id_category
                      ? findCategory(topic.id_category, categories)
                      : ""
                  }
                >
                  <option value="">--Choose a category--</option>

                  {/* Dynamic options */}
                  <SelectCategories
                    array={categories}
                    loading={categoriesLoading}
                  ></SelectCategories>
                </select>
              </div>
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
              aria-label="Add a section"
              className="btn add-btn"
              onClick={(event) => {
                sectionAddHandler(event, setSections, setError);
              }}
            >
              <i className="bi bi-plus-circle add-icon"></i>
            </button>

            <div className="btn-group">
              <Link className="form-btn cancel-btn" to="/">
                Cancel
              </Link>
              <button className="form-btn validate-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
