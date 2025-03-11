import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import './Navbar.css'; // Import CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Stream</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload</Link></li>
        <li><Link to="/dashboard">Videos</Link></li>
      </ul>
      <Link to="/sign">
        <button className="sign-in-btn">Sign In</button>
      </Link>
    </nav>
  );
};

export default Navbar;
