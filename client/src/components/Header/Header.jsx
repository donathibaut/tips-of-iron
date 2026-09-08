import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/Categories/useCategories";

import decodeToken from "../../utils/decodeToken";

import { ListCategories } from "../Categories/ListCategories";

import "./Header.css";

export default function Header() {
  const decodedToken = decodeToken();

  // LIST CATEGORIES
  const { categories, loading } = useCategories();
  return (
    <header>
      <Link className="header-title btn" to="/">
        TIPS of IRON
      </Link>
      <Nav decodedToken={decodedToken} />

      <div className="hidden">
        {/* Hidden Menu */}
        <div className="collapse hidden__menu" id="menuToggleExternalContent">
          <ul className="menu__category">
            <ListCategories
              array={categories}
              loading={loading}
            ></ListCategories>
          </ul>

          {/* IS ROLE 1 || 2 ? */}
          {decodedToken &&
            (decodedToken.role === 1 || decodedToken.role === 2) && (
              <ul className="menu__topic">
                <li className="topic__li">
                  <Link to="/my-topics">
                    <i class="bi bi-window"></i>My topics
                  </Link>
                </li>
                <li className="topic__li">
                  <Link to="/topic-editor">
                    <i class="bi bi-pencil"></i>Create a new topic
                  </Link>
                </li>
              </ul>
            )}
        </div>
      </div>
    </header>
  );
}
