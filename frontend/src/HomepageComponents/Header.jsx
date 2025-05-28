import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; // Make sure to import the CSS file

function Header() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  let lastScrollY = 0;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`header d-flex align-items-center fixed-top ${isHeaderHidden ? "header-hidden" : ""}`}
      style={{ backgroundColor: "rgba(19, 34, 52, 0.9)" }}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img
            src="/assets/img/logo1.jpg"
            alt="Logo"
            style={{ height: "60px", width: "auto", marginRight: "10px" }}
          />
          <h1 className="sitename text-white">AUTO LEAD</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          {auth == null ? (
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/terms">Terms Of Service</Link></li>
              <li><Link to="/adminmain">Admin</Link></li>
            </ul>
          ) : auth.usertype === 0 ? (
            <ul className="nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <Link to="#">
                  <span>Support Tickets</span>{" "}
                  <i className="bi bi-chevron-down toggle-dropdown" />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="/supportticketform">New Ticket</Link></li>
                  <li><Link to="/mytickets">My Tickets</Link></li>
                </ul>
              </li>
              <li><Link to="/customerprofile">My Profile</Link></li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export default Header;
