import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add your own styles here

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
