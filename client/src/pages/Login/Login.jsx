import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

import loginSubmitHandler from "../../utils/handlers/authSubmitHandler/loginSubmitHandler";

export default function Login() {
  const [error, setError] = useState(null);

  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="Tips of Iron connection page" />
      </Helmet>
      <main>
        <section>
          <h1>Sign in</h1>

          {error && <div className="errorMessage">{error}</div>}

          <form
            onSubmit={(event) => {
              loginSubmitHandler(event, setError);
            }}
          >
            <label htmlFor="email">Login ID (email address):</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="150"
              required
            />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Submit</button>
            <Link to="/">Cancel</Link>
          </form>

          <Link to="/new-user">Create a new account</Link>
        </section>
      </main>
    </>
  );
}
