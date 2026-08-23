import { Helmet } from "react-helmet-async";

export default function CreateTopic() {
  return (
    <>
      <Helmet>
        <title>Topic Editor</title>
        <meta name="description" content="Tips of Iron topic edition page" />
      </Helmet>
      <main>
        <section>
          <h1>Create a new Topic</h1>

          <form action="">
            <fieldset>
              <label htmlFor="">Title:</label>
              <input type="text" />
              <label htmlFor="">Global Description:</label>
              <input type="text" />
              <label htmlFor="">Category:</label>
              <select name="category" id="category">
                <option value=""></option>
                {/* Dynamic options */}
              </select>
            </fieldset>
            {/* SECTIONS */}
            <button>
              <img src="" alt="Add a section" />
            </button>
            <button type="submit">Submit</button>
            <button>Cancel</button>
          </form>
        </section>
      </main>
    </>
  );
}
