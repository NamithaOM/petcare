import React, { useState } from "react";
import "../Styles/Auth.css";
import { Link } from "react-router-dom";
import Header from "../HomepageComponents/Header";
import Footer from "../HomepageComponents/Footer";
import LoadingSpinner from "../EffectComponents/LoadingSpinner";
import "aos/dist/aos.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (typeof result === "string") {
          if (result === "Your account is not approved.") {
            alert(
              "Your account is not approved. Please contact the administrator."
            );
          } else {
            alert("Unexpected response from server: " + result);
          }
        } else if (typeof result === "object" && result !== null) {
          localStorage.setItem("user", JSON.stringify(result));
          window.location.href = "/";
        } else {
          alert("Unexpected response from server.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred during login. Please try again.");
      });
  };

  const bgStyle = {
    backgroundImage:
      "linear-gradient(rgba(19, 34, 52, 0.8), rgba(19, 34, 52, 0.8)), url('/assets/img/team-page-title-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  };

  return (
    <>
      <LoadingSpinner />
      <Header />
      <div className="auth-wrapper" style={bgStyle}>
        <div className="auth-box" data-aos="fade-up" data-aos-delay="200">
          <h2
            className="text-white mb-4"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Login
          </h2>
          <div>
            <div
              className="form-group mb-3"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <label className="text-white">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="form-group mb-4"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <label className="text-white">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-light w-100"
              data-aos="zoom-in"
              data-aos-delay="600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <p
            className="text-white mt-3"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            Don't have an account?{" "}
            <Link to="/roles" className="text-decoration-underline text-light">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
