import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../../assets/img/undraw_profile.svg";
import { useAuth } from "./AuthContext"; // Import useAuth to access logout function

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const userType = user?.userType;

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* User Dropdown */}
        <li
          className={`nav-item dropdown no-arrow ${dropdownOpen ? "show" : ""}`}
        >
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : "false"}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userType}
            </span>
            <img
              className="img-profile rounded-circle"
              src={profileImg}
              alt="User"
            />
          </a>

          {/* Dropdown - User Information */}
          <div
            className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
              dropdownOpen ? "show" : ""
            }`}
            aria-labelledby="userDropdown"
          >
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
