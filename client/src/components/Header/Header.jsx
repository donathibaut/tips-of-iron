import { Link } from "react-router-dom";

import Nav from "../Nav/Nav";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">
            <img src="" alt="WEBSITE LOGO" />
          </Link>
        </li>
        <li>
          <Nav />
        </li>
      </ul>
    </header>
  );
}
