import { useState } from "react";
import { Link, NavLink } from "react-router";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <div className="logo-icon">
            <span>U</span>
          </div>

          <div className="logo-content">
            <span className="logo-name">UserFlow</span>
            <span className="logo-subtitle">MERN CRUD</span>
          </div>
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Add User
          </NavLink>

          <NavLink
            to="/users"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Users
          </NavLink>

          <Link
            to="/login"
            className="nav-cta"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </div>

        <button
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;