import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

import userCreateHandler from "../../../../utils/handlers/userSubmitHandler/userCreateHandler";

import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

import "./UserCreate.css";
// Profile page style
import "../../../Profile/Profile.css";

export default function UserCreate() {
  const [error, setError] = useState(null);

  return (
    <>
      <Helmet>
        <title>Sign up</title>
        <meta
          name="description"
          content="Create your account on Tips of Iron"
        />
      </Helmet>
      <main className="account-theme">
        <section className="create-user-section">
          <h1>Sign up</h1>

          <ErrorMessage error={error}></ErrorMessage>

          <form
            onSubmit={(event) => {
              userCreateHandler(event, setError);
            }}
          >
            <fieldset>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                maxLength="50"
                required
              />
            </fieldset>

            <fieldset>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="150"
                required
              />
            </fieldset>

            <fieldset>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </fieldset>

            <fieldset>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
            </fieldset>

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
