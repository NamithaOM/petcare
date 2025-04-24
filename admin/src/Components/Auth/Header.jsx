import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            onClick={toggleDropdown} // Use React state to toggle dropdown
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : "false"}
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              Douglas McGee
            </span>
            <img className="img-profile rounded-circle" src="img/undraw_profile.svg" alt="User" />
          </a>

          {/* Dropdown - User Information */}
          {dropdownOpen && (
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}



     {/* Search Bar */}
      {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form> */}