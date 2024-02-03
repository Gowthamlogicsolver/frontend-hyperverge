import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import image from "../assets/secure-vote-logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Import useNavigate for routing

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/"); // Navigate to the root path (InitialForm.jsx)
    localStorage.removeItem("token");
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={image} alt="Secure Vote" />
        </div>
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <a href="/" onClick={handleLogout}>
            Logout
          </a>{" "}
          {/* Use onClick for routing */}
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className={`line line1 ${isOpen ? "open" : ""}`}></div>
          <div className={`line line2 ${isOpen ? "open" : ""}`}></div>
          <div className={`line line3 ${isOpen ? "open" : ""}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
