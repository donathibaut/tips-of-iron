import { Link } from "react-router-dom";
import { useState } from "react";

import useCategories from "../../hooks/Categories/useCategories";

import logoutSubmitHandler from "../../utils/handlers/authSubmitHandler/logoutSubmitHandler";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { ListCategories } from "../Categories/ListCategories";

import "./Nav.css";

export default function Nav({ decodedToken }) {
  const [error, setError] = useState(null);

  // LIST CATEGORIES
  const { categories, loading } = useCategories();

  return (
    <div className="nav-container">
      <nav className="navbar">
        <ErrorMessage error={error}></ErrorMessage>

        <ul className="navbar__list">
          <li className="desktop-li categories">
            <ul className="desktop-li__ul">
              <ListCategories
                array={categories}
                loading={loading}
              ></ListCategories>
            </ul>
          </li>

          {/* IS ROLE 1 || 2 ? */}
          {decodedToken &&
            (decodedToken.role === 1 || decodedToken.role === 2) && (
              <li className="desktop-li">
                <ul className="desktop-li__ul">
                  <li className="topic__li">
                    <Link to="/my-topics">
                      <i className="bi bi-window"></i>My topics
                    </Link>
                  </li>
                  <li className="topic__li">
                    <Link to="/topic-editor">
                      <i className="bi bi-pencil"></i>Create a new topic
                    </Link>
                  </li>
                </ul>
              </li>
            )}

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

                    <li>
                      <hr className="dropdown-divider" />
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
                <ul className="connect-ul">
                  <li>
                    <Link className="connect-link" to="/login">
                      Sign in
                    </Link>
                  </li>
                </ul>
              )
            }
          </li>

          {/* Navbar Menu Toggler */}
          <li className="container-fluid toggler-li">
            <button
              id="hidden-menu-toggler"
              className="menu-toggler btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menuToggleExternalContent"
              aria-controls="menuToggleExternalContent"
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
