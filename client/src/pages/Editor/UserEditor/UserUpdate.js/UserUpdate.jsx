import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

import userCreateHandler from "../../../../utils/handlers/userSubmitHandler/userCreateHandler";

export default function UserUpdate() {
  const [error, setError] = useState(null);

  return (
    <>
      <Helmet>
        <title>Update my account</title>
        <meta
          name="description"
          content="Update your account on Tips of Iron"
        />
      </Helmet>
      <main>
        <section>
          <h1>Update my account</h1>

          {
            //ERROR MESSAGE
            error !== null && <p className="error-message">{error}</p>
          }

          {/* USERNAME UPDATE */}
          <form
            onSubmit={(event) => {
              userCreateHandler(event, setError);
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
            <button type="submit">Submit</button>
          </form>

          {/* EMAIL UPDATE */}
          <form
            onSubmit={(event) => {
              userCreateHandler(event, setError);
            }}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="150"
              required
            />
            <button type="submit">Submit</button>
          </form>

          {/* PASSWORD UPDATE */}
          <form
            onSubmit={(event) => {
              userCreateHandler(event, setError);
            }}
          >
            <label htmlFor="password">Current Password:</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              required
            />
            <label htmlFor="confirm-new-password">
              Confirm the New Password:
            </label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              required
            />
            <button type="submit">Submit</button>
          </form>

          <Link to="/">Home Page</Link>
        </section>
      </main>
    </>
  );
}
