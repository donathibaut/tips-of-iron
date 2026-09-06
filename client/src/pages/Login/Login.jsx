import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

import loginSubmitHandler from "../../utils/handlers/authSubmitHandler/loginSubmitHandler";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./Login.css";

export default function Login() {
  const [error, setError] = useState(null);

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="Tips of Iron connection page" />
      </Helmet>
      <main>
        <section className="login-section account-theme">
          <h1>Sign in</h1>

          <ErrorMessage error={error}></ErrorMessage>

          <form
            onSubmit={(event) => {
              loginSubmitHandler(event, setError);
            }}
          >
            <fieldset>
              <legend hidden>Put your Email address here</legend>
              <label htmlFor="email">Login ID (email address):</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength="150"
                required
              />
            </fieldset>
            <fieldset>
              <legend hidden>Put your password here</legend>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
            </fieldset>
            <div className="btn-group">
              <Link className="form-btn btn-cancel" to="/">
                Cancel
              </Link>
              <button className="form-btn btn-validate" type="submit">
                Submit
              </button>
            </div>
          </form>

          <Link className="new-account-link" to="/new-user">
            Create a new account
          </Link>
        </section>
      </main>
    </>
  );
}
