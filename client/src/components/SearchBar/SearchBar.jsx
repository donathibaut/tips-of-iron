import { useState } from "react";
import { useNavigate } from "react-router-dom";

import searchSubmitHandler from "../../utils/handlers/searchSubmitHandler";

import "./SearchBar.css";

export default function SearchBar() {
  // search bar input
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  return (
    <form
      role="search"
      className="search-form"
      onSubmit={(event) => searchSubmitHandler(event, input, navigate)}
    >
      <span>
        <i className="bi bi-search search-glass"></i>
      </span>
      <input
        id="search-bar"
        name="search-bar"
        type="search"
        placeholder="Search a topic..."
        aria-label="Search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </form>
  );
}
