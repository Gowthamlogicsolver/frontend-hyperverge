// Navbar.js
import React, { useState } from 'react';
import './navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">Logo</div>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="#">Sign In</a>
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <div className={`line line1 ${isOpen ? 'open' : ''}`}></div>
          <div className={`line line2 ${isOpen ? 'open' : ''}`}></div>
          <div className={`line line3 ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
