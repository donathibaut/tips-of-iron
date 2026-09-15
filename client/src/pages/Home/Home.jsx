import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import scrollList from "../../utils/scrollList";

import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./Home.css";

import UK from "../../assets/img/United_Kingdom.png";
import France from "../../assets/img/France.png";
import USA from "../../assets/img/United_States.png";
import Germany from "../../assets/img/Germany.png";
import Italy from "../../assets/img/Italy.png";
import Japan from "../../assets/img/Japan.png";
import USSR from "../../assets/img/Soviet_Union.png";
import China from "../../assets/img/China.png";
import India from "../../assets/img/British_Raj.png";
import Spain from "../../assets/img/Spain.png";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Tips of Iron</title>
        <meta
          name="description"
          content="Let's learn something new about Hearts of Iron IV! Tips of Iron is designed to help beginners get the hang of the game!"
        />
      </Helmet>
      <main className="home">
        <section className="search-section">
          <h1>We make Hearts&nbsp;of&nbsp;Iron&nbsp;IV understandable!</h1>

          <SuccessMessage></SuccessMessage>

          <SearchBar></SearchBar>
        </section>

        {/* Suggestion links */}
        <div className="section country-section suggestion-section">
          <button
            aria-label="Scroll left"
            className="arrow-btn btn"
            onClick={(event) => scrollList(".country-suggestions", -1)}
          >
            <i className="bi bi-arrow-left-square"></i>
          </button>

          <ul className="suggestion-list country-suggestions">
            <li className="suggestion">
              <Link
                className="suggestion__link"
                to="/results?search=United%20Kingdom"
              >
                <img className="flag" src={UK} alt="United Kingdom flag" />
                <p>United Kingdom</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=France">
                <img className="flag" src={France} alt="French flag" />
                <p>France</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link
                className="suggestion__link"
                to="/results?search=United%20States"
              >
                <img className="flag" src={USA} alt="USA flag" />
                <p>United States</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=Germany">
                <img className="flag" src={Germany} alt="German Reich flag" />
                <p>German Reich</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=Italy">
                <img className="flag" src={Italy} alt="Italian flag" />
                <p>Italy</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=Japan">
                <img className="flag" src={Japan} alt="Japanese flag" />
                <p>Japan</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link
                className="suggestion__link"
                to="/results?search=Soviet%20Union"
              >
                <img className="flag" src={USSR} alt="Soviet flag" />
                <p>Soviet Union</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=China">
                <img className="flag" src={China} alt="Chinese Republic flag" />
                <p>China</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=India">
                <img className="flag" src={India} alt="British Raj flag" />
                <p>British Raj</p>
              </Link>
            </li>
            <li className="suggestion">
              <Link className="suggestion__link" to="/results?search=Spain">
                <img className="flag" src={Spain} alt="Spanish Republic flag" />
                <p>Spain</p>
              </Link>
            </li>
          </ul>

          <button
            aria-label="Scroll right"
            className="arrow-btn btn"
            onClick={(event) => scrollList(".country-suggestions", 1)}
          >
            <i className="bi bi-arrow-right-square"></i>
          </button>
        </div>

        <div className="section interface-section suggestion-section">
          <button
            aria-label="Scroll left"
            className="arrow-btn btn"
            onClick={(event) => scrollList(".interface-suggestions", -1)}
          >
            <i className="bi bi-arrow-left-square"></i>
          </button>

          <ul className="suggestion-list interface-suggestions">
            <li className="suggestion">
              <Link to="/results?search=Faction">Faction</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Decisions">Decisions</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Intelligence%20Agency">
                Intelligence Agency
              </Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Research">Research</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=International%20Market">
                International Market
              </Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Trade">Trade</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Construction">Construction</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Production">Production</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Recruit">Recruit & Deploy</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Logistics">Logistics</Link>
            </li>
            <li className="suggestion">
              <Link to="/results?search=Officer%20Corps">Officer Corps</Link>
            </li>
          </ul>

          <button
            aria-label="Scroll right"
            className="arrow-btn btn"
            onClick={(event) => scrollList(".interface-suggestions", 1)}
          >
            <i className="bi bi-arrow-right-square"></i>
          </button>
        </div>
      </main>
    </>
  );
}
