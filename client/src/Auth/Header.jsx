import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");

    if (token) {
      setIsLoggedIn(true);
    }

    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const handleMessages = () => {
    navigate("/messages");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserType(null);
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100); // Give navigation a moment before reloading
  };

  return (
    <>
      <div className="wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <p className="mb-0 phone pl-md-2">
                <a href="tel:+919123456789" className="mr-2">
                  <span className="fa fa-phone mr-1"></span> +91 91234 56789
                </a>
                <a href="mailto:petcare@email.com">
                  <span className="fa fa-paper-plane mr-1"></span>{" "}
                  petcare@email.com
                </a>
              </p>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="social-media">
                <p className="mb-0 d-flex">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                    rel="noreferrer"
                  >
                    <span className="fa fa-facebook">
                      <i className="sr-only">Facebook</i>
                    </span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                    rel="noreferrer"
                  >
                    <span className="fa fa-twitter">
                      <i className="sr-only">Twitter</i>
                    </span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                    rel="noreferrer"
                  >
                    <span className="fa fa-instagram">
                      <i className="sr-only">Instagram</i>
                    </span>
                  </a>
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    className="d-flex align-items-center justify-content-center"
                    rel="noreferrer"
                  >
                    <span className="fa fa-dribbble">
                      <i className="sr-only">Dribbble</i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <span className="flaticon-pawprint-1 mr-2"></span>Pet care
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              {userType === "customer" && (
                <>
                  <li className="nav-item active">
                    <a href="/" className="nav-link">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/petprofile" className="nav-link">
                      Pet Details
                    </a>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      id="bookingDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Booking History
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="bookingDropdown"
                    >
                      <a href="/drBooking" className="dropdown-item">
                        Doctor
                      </a>
                      <a href="/trainerBooking" className="dropdown-item">
                        Trainer
                      </a>
                      <a href="/groomingBooking" className="dropdown-item">
                        Grooming
                      </a>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a href="/cart" className="nav-link">
                      Cart
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/order" className="nav-link">
                   Order
                    </a>
                  </li>

                  {/* <li className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      id="orderDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Orders
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="orderDropdown"
                    >
                      <a href="/medicineOrders" className="dropdown-item">
                        Medicine
                      </a>
                      <a href="/foodOrders" className="dropdown-item">
                        Food
                      </a>
                      <a href="/accessoriesOrder" className="dropdown-item">
                        Accessories
                      </a>
                    </div>
                  </li> */}
                </>
              )}

              {!isLoggedIn ? (
                <>
                  <li className="nav-item active">
                    <a href="/" className="nav-link">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/about" className="nav-link">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/service" className="nav-link">
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/contact" className="nav-link">
                      Contact
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link">
                      Login
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <FaUserCircle size={20} className="me-1" />
                    Account
                  </span>
                  <ul className="dropdown-menu">
                  <li>
                      <span
                        className="dropdown-item"
                        onClick={handleProfile}
                        style={{ cursor: "pointer" }}
                      >
                       Profile
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={handleMessages}
                        style={{ cursor: "pointer" }}
                      >
                        Messages
                      </span>
                    </li>
                    <li>
                      <span
                        className="dropdown-item"
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </li>

                // <li className="nav-item">
                //   <span onClick={handleLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                //     Logout
                //   </span>
                // </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
