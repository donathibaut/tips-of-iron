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
                autoComplete="username"
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
                autoComplete="email"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="password">
                Password:
                <br />
                <span className="label-span">
                  (Min. 8 characters: lowercase, UPPERCASE, number, !@#$%^)
                </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="new-password"
                minLength="8"
                // 0-9, a-z, A-Z, Special characters "!@#$%^", minLength => 8
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^]).{8,}"
                title="Minimum 8 characters | Include: lowercase, UPPERCASE, number, special character !@#$%^"
              />
            </fieldset>

            <fieldset>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                autoComplete="new-password"
              />
            </fieldset>

            <fieldset className="cgu-fieldset">
              <input type="checkbox" name="cgu" id="cgu" required />
              <label htmlFor="cgu">
                When you create an account, your email address will be used
                solely as your login ID. In accordance with the law, you have
                the right to access your information.
              </label>
            </fieldset>

            <Link className="personal-data-link" to="/personal-data">
              Click here to see the use of Personal Data
            </Link>

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
