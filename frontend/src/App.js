// src/App.jsx
import React, { useState, useEffect } from "react";
import Footer from "./components/OurTeam/Footer";
import Voter from "./components/VoterReg/VoterRegistration";
import Login from "./components/Login/Login";
import Contactbody from "./components/Contact/Contactbody";
import Candidate from "./components/CandidateReg/CandidateRegistration";
import Team from "./components/OurTeam/Team";
import Home from "./components/Home/Home";
import VoteCast from "./components/VoteCastPage/VoteCast";
import Results from "./components/Results/Results";
import Header from "./Header"; // Import the Header component
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by looking for the name in localStorage
    const loggedInUser = localStorage.getItem("name");
    if (loggedInUser) {
      setUserName(loggedInUser); // Set the user name if logged in
    }
  }, []);

  return (
    <BrowserRouter>
      <Header userName={userName} setUserName={setUserName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/VoteCast" element={<VoteCast />} />
        <Route path="/Contact" element={<Contactbody />} />
        <Route path="/Votereg" element={<Voter />} />
        <Route path="/CandidateReg" element={<Candidate />} />
        <Route path="/Login" element={<Login setUserName={setUserName} />} />
        <Route path="/Results" element={<Results />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
