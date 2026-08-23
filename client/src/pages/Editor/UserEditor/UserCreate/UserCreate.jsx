import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { userCreateHandler } from "../../../../utils/handlers/userSubmitHandler";

export default function CreateUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Sign up</title>
        <meta
          name="description"
          content="Create your account on Tips of Iron"
        />
      </Helmet>
      <main>
        <section>
          <h1>Sign up</h1>

          {error && <div className="errorMessage">{error}</div>}

          <form
            onSubmit={(event) => {
              userCreateHandler(event, setError, navigate);
            }}
          >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength="50"
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="150"
              required
            />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />

            <button type="submit">Submit</button>
            <Link to="/">Cancel</Link>
          </form>
        </section>
      </main>
    </>
  );
}
