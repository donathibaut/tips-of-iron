import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link to="/legal-notice">Legal Notice</Link>
        </li>
        <li>
          <Link to="/personal-data">Personal Data</Link>
        </li>
        <li>
          <Link to="/accessibility">Accessibility</Link>
        </li>
        <li>
          <Link to="/cookies">Cookies</Link>
        </li>
      </ul>
      <p className="copyrights">© ThibautDONA 2026 / All rights reserved.</p>
    </footer>
  );
}
