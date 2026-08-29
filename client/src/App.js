import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

// LOGIN
import Login from "./pages/Login/Login";

// PROFILE
import Profile from "./pages/Profile/Profile";

// RESULTS
import Results from "./pages/Results/Results";

// CRUD USER
import CreateUser from "./pages/Editor/UserEditor/UserCreate/UserCreate";

// CRUD TOPIC
import Topic from "./pages/Topic/Topic";
import CreateTopic from "./pages/Editor/TopicEditor/TopicCreate/TopicCreate";

// NORMS
import Accessibility from "./pages/Norms/Accessibility/Accessibility";
import Cookies from "./pages/Norms/Cookies/Cookies";
import LegalNotice from "./pages/Norms/LegalNotice/LegalNotice";
import PersonalData from "./pages/Norms/PersonalData/PersonalData";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />}></Route>

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />}></Route>

        {/* RESULTS */}
        <Route path="/results/:search" element={<Results />}></Route>

        {/* CRUD USER */}
        <Route path="/new-user" element={<CreateUser />}></Route>

        {/* CRUD TOPIC */}
        <Route path="/topic" element={<Topic />}></Route>
        <Route path="/new-topic" element={<CreateTopic />}></Route>

        {/* NORMS */}
        <Route path="/accessibility" element={<Accessibility />}></Route>
        <Route path="/cookies" element={<Cookies />}></Route>
        <Route path="/legal-notice" element={<LegalNotice />}></Route>
        <Route path="/personal-data" element={<PersonalData />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
