import { useState } from "react";
import { useNavigate } from "react-router-dom";

import searchSubmitHandler from "../../utils/handlers/searchSubmitHandler";

export default function SearchBar() {
  // search bar input
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  return (
    <form
      className="form-inline my-2 my-lg-0"
      onSubmit={(event) => searchSubmitHandler(event, input, navigate)}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search a topic..."
        aria-label="Search"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </form>
  );
}
