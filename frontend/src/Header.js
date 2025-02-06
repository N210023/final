import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [userName, setUserName] = useState(null);
  const dropdownRef = useRef(null);

  // Check for user login status on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem("name");
    if (loggedInUser) {
      setUserName(loggedInUser);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRegisterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle Register dropdown
  const toggleRegisterDropdown = () => {
    setShowRegisterDropdown((prevState) => !prevState);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
  };

  return (
    <div className="app-header-container">
      <header className="App-header">
        <h1>DigiDemo's</h1>
        <nav>
          <ul>
            <li>
              <button onClick={() => setShowRegisterDropdown(false)}>
                <Link to="/" className="link1">Home</Link>
              </button>
            </li>
            <li>
              <button onClick={() => setShowRegisterDropdown(false)}>
                <Link to="/Team" className="link2">Our Team</Link>
              </button>
            </li>
            <li>
              <button onClick={() => setShowRegisterDropdown(false)}>
                <Link to="/VoteCast" className="link3">Vote</Link>
              </button>
            </li>
            <li>
              <button onClick={() => setShowRegisterDropdown(false)}>
                <Link to="/Contact" className="link5">Contact Us</Link>
              </button>
            </li>
            <li>
              <button onClick={() => setShowRegisterDropdown(false)}>
                <Link to="/Results" className="link4">Result</Link>
              </button>
            </li>
            <li style={{ position: "relative" }} ref={dropdownRef}>
              <button onClick={toggleRegisterDropdown} className="link5">Register</button>
              {showRegisterDropdown && (
                <div className="dropdown-menu">
                  <Link to="/Votereg" onClick={() => setShowRegisterDropdown(false)}>
                    <h4>Voter</h4>
                  </Link>
                  <Link to="/CandidateReg" onClick={() => setShowRegisterDropdown(false)}>
                    <h4>Candidate</h4>
                  </Link>
                </div>
              )}
            </li>

            {/* Conditionally render Login button or user's name */}
            <li>
              {userName ? (
                <>
                  <span>{userName}</span>
                  <button onClick={handleLogout} className="link6">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => setShowRegisterDropdown(false)}>
                  <Link to="/Login" className="link6">Login</Link>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
