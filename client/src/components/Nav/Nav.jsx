import { Link } from "react-router-dom";
import { useState } from "react";

import logoutSubmitHandler from "../../utils/handlers/authSubmitHandler/logoutSubmitHandler";

import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import "./Nav.css";

export default function Nav({ decodedToken }) {
  const [error, setError] = useState(null);

  return (
    <div className="nav-container">
      <nav className="navbar">
        <ErrorMessage error={error}></ErrorMessage>

        <ul className="navbar__list">
          <li>
            <SearchBar></SearchBar>
          </li>
          <li>
            {
              // PROFILE || SIGN IN
              decodedToken ? (
                <div className="dropdown">
                  <button
                    className="btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle"></i>
                  </button>
                  <ul className="dropdown-menu">
                    {/* PROFILE */}
                    <li>
                      <Link
                        className="dropdown-item connect-link"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    {/* LOG OUT */}
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={(event) => {
                          logoutSubmitHandler(setError, event);
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li>
                  <Link className="connect-link" to="/login">
                    Sign in
                  </Link>
                </li>
              )
            }
          </li>

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
              <i className="bi bi-list"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
