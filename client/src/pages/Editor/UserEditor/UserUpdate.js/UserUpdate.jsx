import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";

import decodeToken from "../../../../utils/decodeToken";

import { useUserByID } from "../../../../hooks/Users/useUsers";

import SuccessMessage from "../../../../components/SuccessMessage/SuccessMessage";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

import userUpdateHandler from "../../../../utils/handlers/userSubmitHandler/userUpdateHandler";

import "./UserUpdate.css";
// Profile page style
import "../../../Profile/Profile.css";

export default function UserUpdate() {
  const [error, setError] = useState(null);

  const decodedToken = decodeToken();
  const userID = decodedToken ? decodedToken.id_user : null;

  // selected User
  let { user, loading } = useUserByID(userID);

  return loading ? (
    <li className="loading">Loading...</li>
  ) : (
    <>
      <Helmet>
        <title>Update my account</title>
        <meta
          name="description"
          content="Update your account on Tips of Iron"
        />
      </Helmet>
      <main className="account-theme">
        <section className="update-section">
          <h1 className="profile-h1">Update my account</h1>

          <SuccessMessage></SuccessMessage>

          <ErrorMessage error={error}></ErrorMessage>

          {/* USERNAME UPDATE */}
          <form
            className="update-form"
            onSubmit={(event) => {
              userUpdateHandler(event, userID, setError);
            }}
          >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength="50"
              defaultValue={user && user.username ? user.username : "ERROR"}
              required
              autoComplete="username"
            />
            <button className="validate-btn form-btn" type="submit">
              Submit
            </button>
          </form>

          {/* EMAIL UPDATE */}
          <form
            className="update-form"
            onSubmit={(event) => {
              userUpdateHandler(event, userID, setError);
            }}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="150"
              defaultValue={user && user.email ? user.email : "ERROR"}
              required
              autoComplete="email"
            />
            <button className="validate-btn form-btn" type="submit">
              Submit
            </button>
          </form>

          {/* PASSWORD UPDATE */}
          <form
            className="update-form"
            onSubmit={(event) => {
              userUpdateHandler(event, userID, setError);
            }}
          >
            {/* Accessibility Input (hidden) */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={user && user.username ? user.username : ""}
              readOnly
              hidden
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
            />

            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              autoComplete="new-password"
              minLength="8"
              // 0-9, a-z, A-Z, Special characters "!@#$%^", minLength => 8
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^]).{8,}"
              title="Minimum 8 characters | Include: lowercase, UPPERCASE, number, special character !@#$%^"
            />
            <label htmlFor="confirmNewPassword">
              Confirm your New Password:
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              required
              autoComplete="new-password"
            />
            <button className="validate-btn form-btn" type="submit">
              Submit
            </button>
          </form>

          <Link className="home-btn cancel-btn form-btn" to="/">
            Home Page
          </Link>
        </section>
      </main>
    </>
  );
}
