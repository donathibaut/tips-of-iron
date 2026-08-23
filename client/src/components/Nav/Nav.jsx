import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <ul>
        <li>
          <button>
            <img src="" alt="Search Button" />
          </button>
        </li>
        <li>
          <Link to="/login">
            <img src="" alt="Sign in" />
          </Link>
        </li>
        <li>
          <button>
            <img src="" alt="Nav Button" />
          </button>
        </li>
      </ul>
      <ul>
        <li>Nav Elements</li>
      </ul>
    </div>
  );
}
