import { Link } from "react-router-dom";
import { useState } from "react";

import logoutSubmitHandler from "../../utils/handlers/authSubmitHandler/logoutSubmitHandler";

export default function Nav() {
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  return (
    <div>
      <ul>
        <li>
          <button>
            <img src="" alt="Search Button" />
          </button>
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
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
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
