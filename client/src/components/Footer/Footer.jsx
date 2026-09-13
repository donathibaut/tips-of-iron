import { Link } from "react-router-dom";

import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <ul className="norms">
        <li className="norms__li">
          <Link to="/legal-notice" className="norm-link">
            Legal Notice
          </Link>
        </li>
        <li className="norms__li">
          <Link to="/personal-data" className="norm-link">
            Personal Data
          </Link>
        </li>
        <li className="norms__li">
          <Link to="/accessibility" className="norm-link">
            Accessibility
          </Link>
        </li>
      </ul>
      <p className="copyrights">© ThibautDONA 2026 / All rights reserved.</p>
    </footer>
  );
}
