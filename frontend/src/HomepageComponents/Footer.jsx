import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(auth);
  return (
    <>
      <footer id="footer" className="footer light-background">
        <div className="footer-top" data-aos="fade-up" data-aos-delay="100">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-5 col-md-12 footer-about"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <Link to="/" className="logo d-flex align-items-center">
                  <img src="assets/img/logo3.png" alt="" />
                  <span className="sitename">AUTO LEAD</span>
                </Link>
                <p>
                  AUTO LEAD is built to help you stay organized, stay connected,
                  and grow with confidence. Trusted by teams to manage leads and
                  customer relationships seamlessly.
                </p>
                <div
                  className="social-links d-flex mt-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <Link to="">
                    <i className="bi bi-twitter-x"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link to="">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>

              <div
                className="col-lg-2 col-6 footer-links"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h4>Useful Links</h4>
                {auth == null ? (
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About us</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact us</Link>
                    </li>
                    <li>
                      <Link to="/terms">Terms of service</Link>
                    </li>
                    <li>
                      <Link to="/adminmain">Admin</Link>
                    </li>
                  </ul>
                ) : auth.usertype == 0 ? (
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About us</Link>
                    </li>
                    <li>
                      <Link to="/terms">Terms of service</Link>
                    </li>
                  </ul>
                ) : null}
              </div>

              <div
                className="col-lg-3 col-md-12 footer-contact text-center text-md-start"
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <h4>Contact Us</h4>
                <p className="mt-4">
                  <strong>Phone:</strong> <span>+91 9633726219</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>anandanajit2000@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container copyright text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Auto Lead</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            {/* All the links in the footer should remain intact. */}
            {/* You can delete the links only if you've purchased the pro version. */}
            {/* Licensing information: https://bootstrapmade.com/license/ */}
            {/* Purchase the pro version with working PHP/LinkJAX contact form: [buy-url] */}
            {/* Designed by <Link to="https://bootstrapmade.com/">BootstrapMade</Link> Distributed by <Link to="https://themewagon.com">ThemeWagon</Link> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
