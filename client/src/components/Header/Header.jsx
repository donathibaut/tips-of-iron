import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

import useCategories from "../../hooks/Categories/useCategories";

import decodeToken from "../../utils/decodeToken";
import togglerLink from "../../utils/togglerLink";

import { ListCategories } from "../Categories/ListCategories";

import "./Header.css";

export default function Header() {
  const decodedToken = decodeToken();

  // LIST CATEGORIES
  const { categories, loading } = useCategories();
  return (
    <header>
      <Link className="header-title btn" to="/" onClick={togglerLink}>
        TIPS of IRON
      </Link>
      <Nav decodedToken={decodedToken} />

      <div className="hidden hidden-container">
        {/* Hidden Menu */}
        <div className="collapse hidden__menu" id="menuToggleExternalContent">
          <ul className="menu__first collapse__ul">
            <ListCategories
              array={categories}
              loading={loading}
            ></ListCategories>
          </ul>

          {/* IS ROLE 1 || 2 ? */}
          {decodedToken &&
            (decodedToken.role === 1 || decodedToken.role === 2) && (
              <ul className="collapse__ul">
                <li className="topic__li">
                  <Link
                    className="hidden-menu-link"
                    to="/my-topics"
                    onClick={togglerLink}
                  >
                    <i className="bi bi-window"></i>My topics
                  </Link>
                </li>
                <li className="topic__li">
                  <Link
                    className="hidden-menu-link"
                    to="/topic-editor"
                    onClick={togglerLink}
                  >
                    <i className="bi bi-pencil"></i>Create a new topic
                  </Link>
                </li>
              </ul>
            )}
        </div>
      </div>
    </header>
  );
}
