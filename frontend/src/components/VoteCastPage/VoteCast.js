import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./CardStyles.css";
import "./VoteCastStyles.css";

function VotingPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]); // Store students data
  const [votedCandidate, setVotedCandidate] = useState(null); // Store voted candidate
  const navigate = useNavigate();

  // Retrieve userId and isVoted from localStorage
  const userId = localStorage.getItem("userId");
  const isVoted = localStorage.getItem("isVoted") === "true"; // Convert string to boolean

  // Fetch students from backend
  const getStudents = async () => {
    try {
      const response = await fetch("https://digidemos.onrender.com/api/auth/students");
      const data = await response.json();
      setStudents(data); // Store students in state
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getStudents(); // Fetch students when component loads
  }, []);

  // Handle voting action
  const handleVote = (candidateName) => {
    setVotedCandidate(candidateName);
    localStorage.setItem("isVoted", "true"); // Update local storage after vote
  };

  return (
    <>
      <h1 id="heading9">Candidates List</h1>

      <div id="searchdiv">
        <div id="searchbar">
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Candidate name 🔍"
          />
        </div>
      </div>

      <div className="cardsContainer">
        {students
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.idNo}
              name={item.name}
              id={item.idNo}
              year={item.year}
              branch={item.branch}
              handleVote={handleVote}
              isVoted={votedCandidate === item.name}
            />
          ))}
      </div>
    </>
  );
}

export default VotingPage;
