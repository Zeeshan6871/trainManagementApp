import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { isAdmin } from "../App";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Train Booking System
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trains/availability" className="nav-link">
              Train Availability
            </Link>
          </li>
          {!token ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              {isAdmin() ? (
                <li className="nav-item">
                  {
                    <Link to="/admin/add-train" className="nav-link">
                      Add Train
                    </Link>
                  }
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn-link">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
