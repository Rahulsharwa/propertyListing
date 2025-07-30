import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏘 Property Dashboard
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link">Add Property</Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 