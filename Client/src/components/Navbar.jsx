import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { isAdmin } from "../App";

const NavBar = () => {
  const [showinput, setShowinput] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [bookingId, setbookingId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    navigate(`/bookings/${bookingId}`);
    e.preventDefault();
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
              <li
                className="nav-item"
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => {
                  setShowinput((prev) => !prev);
                }}
              >
                Booking Details
                {showinput && (
                  <form
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: "absolute", top: "2rem" }}
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="number"
                      value={bookingId}
                      placeholder="Enter Booking ID"
                      onChange={(e) => setbookingId(e.target.value)}
                    />
                    <button type="submit">Find Details</button>
                  </form>
                )}
              </li>
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
