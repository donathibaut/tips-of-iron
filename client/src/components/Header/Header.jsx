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
      <Link className="header-title" to="/">
        TIPS of IRON
      </Link>
      <Nav decodedToken={decodedToken} />

      {/* Hidden Menu */}
      <div
        className="collapse hidden-menu"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <ul className="hidden-menu__category">
          <ListCategories array={categories} loading={loading}></ListCategories>
        </ul>

        {/* IS ROLE 1 || 2 ? */}
        {decodedToken &&
          (decodedToken.role === 1 || decodedToken.role === 2) && (
            <ul className="hidden-menu__topic">
              <li>
                <Link to="/my-topics">My topics</Link>
              </li>
              <li>
                <Link to="/topic-editor">Create a new topic</Link>
              </li>
            </ul>
          )}
      </div>
    </header>
  );
}
