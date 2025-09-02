import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; 

export default function Navbar() {
  // React hook for managing the state of the menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/" onClick={handleLinkClick}>
          🎓 Student Hub
        </NavLink>
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </div>

      {/* Navigation Links */}
      <div className={menuOpen ? "nav-links mobile-active" : "nav-links"}>
        <NavLink to="/" className="nav-item" onClick={handleLinkClick}>
          Dashboard
        </NavLink>
        <NavLink to="/students" className="nav-item" onClick={handleLinkClick}>
          Student Details
        </NavLink>
        <NavLink to="/add" className="nav-item add-student-btn" onClick={handleLinkClick}>
           Add Student
        </NavLink>
      </div>
    </nav>
  );
}