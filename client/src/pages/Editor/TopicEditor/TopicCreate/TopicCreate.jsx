import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SelectCategories } from "../../../../components/Categories/ListCategories";
import { useState } from "react";

import useCategories from "../../../../hooks/Categories/useCategories";
import sectionAddHandler from "../../../../utils/handlers/sectionSubmitHandler/sectionAddHandler";

import FieldsetSection from "../../../../components/Sections/FieldsetSection";

export default function CreateTopic() {
  const [error, setError] = useState(null);

  // LIST CATEGORIES
  const { categories, loading } = useCategories();

  // SECTIONS
  const [sections, setSections] = useState([]);
  /**
   * @function sectionRemove
   * @param {Event} event
   * @param {Number} removeField - field ID to remove
   * @returns {void}
   * @description Remove section fieldset
   */
  const sectionRemove = (event, removeField) => {
    // PREVENT page refresh on form submission
    event.preventDefault();

    try {
      setSections(sections.filter((object) => object.fieldID !== removeField));
    } catch (e) {
      console.log("Cancel Section Error:", e);
      setError(e.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Topic Editor</title>
        <meta name="description" content="Tips of Iron topic edition page" />
      </Helmet>
      <main>
        <section>
          <h1>Create a new Topic</h1>

          {
            // ERROR MESSAGE
            error !== null && <p className="error-message">{error}</p>
          }

          <form action="">
            <fieldset>
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" required />
              <label htmlFor="description">Global Description:</label>
              <input type="text" id="description" name="description" required />
              <label htmlFor="">Category:</label>
              <select name="category" id="category" required>
                <option value="">--Choose a category--</option>
                {/* Dynamic options */}
                <SelectCategories
                  array={categories}
                  loading={loading}
                ></SelectCategories>
              </select>
            </fieldset>

            {/* SECTIONS Fieldsets */}
            {sections.map((object, index) => {
              return (
                <FieldsetSection
                  key={object.fieldID}
                  index={index}
                  remove={(event) => sectionRemove(event, object.fieldID)}
                ></FieldsetSection>
              );
            })}
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
