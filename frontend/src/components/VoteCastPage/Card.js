import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardStyles.css";

function Card(props) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const castVote = async (candidateId) => {
    if (!userId) {
      alert("Please login to vote.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/vote/castvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          idNo: candidateId, // Candidate ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Vote cast successfully!");
        
        localStorage.setItem("isVoted", "true"); // Update voting status
        props.handleVote(candidateId); // Update UI in parent component
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while casting the vote.");
      console.error("Vote Error:", error);
    }
  };

  // Button class dynamically changes based on vote status
  const voteButtonClass = props.isVoted ? "voted" : "vote";

  return (
    <div className="card">
      <img
        src={`https://intranet.rguktn.ac.in/SMS/usrphotos/user/${props.id}.jpg`}
        alt="Candidate profile picture"
        id="img-id"
      />
      <div id="card-details">
        <p className="card-name">{props.name}</p>
        <p>
          {props.id}, <span>{props.year}</span>, <span>{props.branch}</span>
        </p>
      </div>
      <div>
        <button
          className={voteButtonClass}
          disabled={props.isVoted}
          onClick={() => castVote(props.id)}
        >
          {props.isVoted ? "Voted" : "Vote"}
        </button>
      </div>
    </div>
  );
}

export default Card;
