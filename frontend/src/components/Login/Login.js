import React, { useState } from "react";
import "./LoginStyles.css";
import reg from "./register.svg";
import logo from "./log.svg";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserName }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [voterPassword, setVoterPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [showVoterPassword, setShowVoterPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Universal constant
  const navigate = useNavigate();

  const handleSignUpClick = () => setIsSignUpMode(true);
  const handleSignInClick = () => setIsSignUpMode(false);

  const togglePasswordVisibility = (isAdmin) => {
    isAdmin
      ? setShowAdminPassword(!showAdminPassword)
      : setShowVoterPassword(!showVoterPassword);
  };

  const handleVoterLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://digidemos.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: voterEmail, password: voterPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsLogin(true);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isVoted", data.isVoted);
        alert("Login successful, user authenticated!");
        setUserName(data.name);
        setIsLogin(true); // Set login status to true
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      alert(`Error during voter login: ${error.message}`);
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    console.log("Admin login logic goes there");
    setIsLogin(true); // Example: Set login status for admin login
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Voter Login Form */}
          <form onSubmit={handleVoterLogin} className="sign-in-form">
            <h2 className="title-login">VOTER LOGIN</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                value={voterEmail}
                onChange={(e) => setVoterEmail(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showVoterPassword ? "text" : "password"}
                placeholder="Password"
                value={voterPassword}
                onChange={(e) => setVoterPassword(e.target.value)}
              />
              <i
                className={`fas ${
                  showVoterPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => togglePasswordVisibility(false)}
              ></i>
            </div>

            <input type="submit" value="Login" className="btn_solid" />
            <a href="participant_forgot_password.php">
              <h4>Forgot Your Password?</h4>
            </a>
          </form>

          {/* Admin Login Form */}
          <form onSubmit={handleAdminLogin} className="sign-up-form">
            <h2 className="title">ADMIN LOGIN</h2>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showAdminPassword ? "text" : "password"}
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <i
                className={`fas ${
                  showAdminPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => togglePasswordVisibility(true)}
              ></i>
            </div>

            <input type="submit" className="btn_solid" value="Login" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Are you Admin?</h3>
            <p>If yes, click below to enter the Admin Login portal.</p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Login
            </button>
          </div>
          <img src={logo} className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Are you a Voter?</h3>
            <p>If yes, click below to enter the Voter Login portal.</p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Login
            </button>
          </div>
          <img src={reg} className="image" alt="" />
        </div>
      </div>

      {/* Show message if user is logged in */}
      {isLogin && <div className="login-message">User is logged in</div>}
    </div>
  );
};

export default Login;
