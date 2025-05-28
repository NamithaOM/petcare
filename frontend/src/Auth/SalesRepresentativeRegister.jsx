import React, { useEffect, useState } from "react";
import "../Styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../HomepageComponents/Header";
import Footer from "../HomepageComponents/Footer";
import LoadingSpinner from "../EffectComponents/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";

function SalesRepresentativeRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [workType, setWorkType] = useState("");
  const navigate = useNavigate();

  const handleReg = () => {
    // Validate all fields
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !employeeId ||
      !workLocation ||
      !commissionRate ||
      !workType
    ) {
      alert("All fields are required!");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Validate commission rate
    if (!["5%", "10%", "15%", "20%"].includes(commissionRate)) {
      alert("Please select a valid commission rate.");
      return;
    }

    // Validate work type
    if (!["Remote", "Office"].includes(workType)) {
      alert("Please select a valid work type.");
      return;
    }

    const param = {
      name,
      email,
      phone,
      password,
      employeeId,
      workLocation,
      commissionRate,
      workType,
      usertype: 2,
      status: "pending",
    };

    fetch("http://localhost:4000/auth/salesrepresentativeregister", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setEmployeeId("");
        setWorkLocation("");
        setCommissionRate("");
        setWorkType("");
        navigate("/login");
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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

  const wrapperStyle = {
    maxWidth: "900px",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    marginTop: "85px",
  };

  return (
    <>
      <LoadingSpinner />
      <Header />
      <div className="auth-wrapper" style={bgStyle}>
        <div
          className="auth-box"
          style={wrapperStyle}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2
            className="text-white mb-4 text-center"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Sales Representative Register
          </h2>
          <div className="row">
            <div
              className="col-md-6"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div className="form-group mb-3">
                <label htmlFor="name" className="text-white">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left" data-aos-delay="500">
              <div className="form-group mb-3">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-right"
              data-aos-delay="600"
            >
              <div className="form-group mb-3">
                <label htmlFor="phone" className="text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left" data-aos-delay="700">
              <div className="form-group mb-3">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-right"
              data-aos-delay="800"
            >
              <div className="form-group mb-3">
                <label htmlFor="employeeId" className="text-white">
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  className="form-control"
                  placeholder="Enter your employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6" data-aos="fade-left" data-aos-delay="900">
              <div className="form-group mb-3">
                <label htmlFor="workLocation" className="text-white">
                  Work Location
                </label>
                <input
                  type="text"
                  id="workLocation"
                  className="form-control"
                  placeholder="Enter your work location"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                />
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-right"
              data-aos-delay="1000"
            >
              <div className="form-group mb-3">
                <label htmlFor="commissionRate" className="text-white">
                  Commission Rate
                </label>
                <select
                  id="commissionRate"
                  className="form-control"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                >
                  <option value="">Select commission rate</option>
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                  <option value="20%">20%</option>
                </select>
              </div>
            </div>
            <div
              className="col-md-6"
              data-aos="fade-left"
              data-aos-delay="1100"
            >
              <div className="form-group mb-4">
                <label htmlFor="workType" className="text-white">
                  Work Type
                </label>
                <select
                  id="workType"
                  className="form-control"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                >
                  <option value="">Select work type</option>
                  <option value="Remote">Remote</option>
                  <option value="Office">Office</option>
                </select>
              </div>
            </div>
          </div>
          <p
            className="text-white mb-4"
            data-aos="fade-up"
            data-aos-delay="1100"
          >
            By registering, you agree to our{" "}
            <Link to="/terms" className="text-decoration-underline text-light">
              Terms of Service
            </Link>
            .
          </p>
          <button
            type="button"
            className="btn btn-light w-100"
            data-aos="zoom-in"
            data-aos-delay="1200"
            onClick={handleReg}
          >
            Register
          </button>
          <p
            className="text-white mt-3 text-center"
            data-aos="fade-up"
            data-aos-delay="1300"
          >
            Already registered?{" "}
            <Link to="/login" className="text-decoration-underline text-light">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SalesRepresentativeRegister;
