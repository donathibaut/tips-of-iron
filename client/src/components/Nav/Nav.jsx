import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import logoutSubmitHandler from "../../utils/handlers/authSubmitHandler/logoutSubmitHandler";

import useCategories from "../../hooks/Categories/useCategories";
import { ListCategories } from "../Categories/ListCategories";

export default function Nav() {
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  // DECODE Base64 token to access token role (for example)
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch (e) {
      console.error("Token Issue", e);
    }
  }

  // LIST CATEGORIES
  const { categories, loading } = useCategories();

  return (
    <div>
      <nav className="navbar">
        {
          //ERROR MESSAGE
          error !== null && <p className="error-message">{error}</p>
        }

        <ul>
          <li>
            <Link to="/">Tips of Iron</Link>
          </li>
          <li>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </li>

          {
            // PROFILE || SIGN IN
            token ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="" alt="Profile Options" />
                </button>
                <ul className="dropdown-menu">
                  {/* PROFILE */}
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  {/* LOG OUT */}
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(event) => {
                        logoutSubmitHandler(event, setError);
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <li>
                <Link to="/login">
                  <img src="" alt="Sign in" />
                </Link>
              </li>
            )
          }

          {/* Navbar Toggler */}
          <li className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Hidden Menu */}
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <ul className="category-list">
          <ListCategories array={categories} loading={loading}></ListCategories>
        </ul>

        {/* IS ROLE 1 || 2 ? */}
        {token && (decodedToken.role === 1 || decodedToken.role === 2) && (
          <ul className="action-list">
            <li>
              <Link to="/my-topics">My topics</Link>
            </li>
            <li>
              <Link to="/new-topic">Create a new topic</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
