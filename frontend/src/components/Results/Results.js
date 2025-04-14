import React, { useState, useEffect } from "react";
import WinnerCard from "./WinnerCard";
import "./WinnerCard.css";
import "./Results.css";

const Results = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates data from backend
    const getCandidates = async () => {
      try {
        const response = await fetch(
          "https://digidemos.onrender.com/api/vote/candidates"
        ); // Adjust your backend URL
        const data = await response.json();
        setCandidates(data); // Store the fetched candidates in state
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    getCandidates(); // Fetch the data when the component loads
  }, []);

  return (
    <div className="result-container">
      <header className="winner-header">
        <h1>Voting Results - Winners Announcement</h1>
        <p>Celebrating the winners who lead us to a brighter tomorrow.</p>
      </header>

      <div className="winners-containers">
        {candidates.length > 0 ? (
          candidates.map((candidate, index) => (
            <WinnerCard
              key={candidate._id} // Use unique candidate ID as the key
              rank={`${index + 1}st`} // Assuming you want to show rank dynamically
              name={candidate.name}
              id={candidate.idNo}
              position={candidate.branch} // You can adjust if needed
              voteCount={candidate.voteCount}
            />
          ))
        ) : (
          <p>No winners available</p>
        )}
      </div>
    </div>
  );
};

export default Results;
