// Team.js
import React from "react";
import TeamCard from "./TeamCard";
import memberImage from "./member.png"; // Importing the image
import "./Team.css";

const teamMembers = [
  { name: "Diwakar", title: "Scrum manager", id:"N210242",call: "https://wa.me/918074416044"},
  { name: "Karthik", title: "Full Stack Developer",id:"N210803",call:"https://wa.me/918121227279"},
  { name: "Siddartha", title: "Product Manager", id:"N210023",call:"https://wa.me/919059533659" },
  { name: "Aditya", title: "Web Developer", id:"N210435", call:"https://wa.me/919059533659"},
  { name: "Farhana", title: "Web Developer", id:"N210459", call:"https://wa.me/919059533659"},
  { name: "Manoj", title: "Web Developer", id:"N210519",call:"https://wa.me/917416587543"}
];

const Team = () => {
  return (
    <section className="team-section">
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            title={member.title}
            id={member.id}
            call={member.call}
          />
        ))}
      </div>
    </section>
  );
};

export default Team;
