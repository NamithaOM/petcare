import React, { useEffect, useState } from "react";
import "../Styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../HomepageComponents/Header";
import Footer from "../HomepageComponents/Footer";
import LoadingSpinner from "../EffectComponents/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";

function CustomerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReg = () => {
    // Validate all fields
    if (!name || !email || !address || !phone || !gender || !dob || !password) {
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

    // Validate gender
    if (!["male", "female", "other"].includes(gender)) {
      alert("Please select a valid gender.");
      return;
    }

    const param = {
      name,
      email,
      address,
      phone,
      gender,
      dob,
      password,
      usertype: 0,
    };

    fetch("http://localhost:4000/auth/customerregister", {
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
        setAddress("");
        setPhone("");
        setGender("");
        setDob("");
        setPassword("");

        // Trigger image upload if an image is selected
        if (image) {
          handleImageUpload(result.customerId);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleImageUpload = (customerId) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("customerId", customerId); // Attach the customerId to associate with the registration

    fetch("http://localhost:4000/auth/customerimageupload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate("/login"); // Navigate to login page after successful upload
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
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    marginTop: "85px",
  };

  const formRowStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  };

  const formGroupStyle = {
    flex: "1 1 48%",
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
            Customer Register
          </h2>
          <div>
            <div style={formRowStyle}>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-right"
                data-aos-delay="400"
              >
                <label htmlFor="name" className="text-white">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-left"
                data-aos-delay="500"
              >
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div style={formRowStyle}>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-right"
                data-aos-delay="600"
              >
                <label htmlFor="address" className="text-white">
                  Address
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  placeholder="Enter your address"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-left"
                data-aos-delay="700"
              >
                <label htmlFor="phone" className="text-white">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div style={formRowStyle}>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-right"
                data-aos-delay="800"
              >
                <label htmlFor="gender" className="text-white">
                  Gender
                </label>
                <select
                  id="gender"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div
                className="form-group mb-3"
                style={formGroupStyle}
                data-aos="fade-left"
                data-aos-delay="900"
              >
                <label htmlFor="dob" className="text-white">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>
            <div
              className="form-group mb-4"
              data-aos="fade-right"
              data-aos-delay="1000"
            >
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              className="form-group mb-4"
              data-aos="fade-left"
              data-aos-delay="1050"
            >
              <label htmlFor="image" className="text-white">
                Profile Picture
              </label>
              <input
                id="image"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <p
              className="text-white mb-4"
              data-aos="fade-up"
              data-aos-delay="1100"
            >
              By registering, you agree to our{" "}
              <Link
                to="/terms"
                className="text-decoration-underline text-light"
              >
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
          </div>
          <p
            className="text-white mt-3 text-center"
            data-aos="fade-up"
            data-aos-delay="1300"
          >
            Already have an account?{" "}
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

export default CustomerRegister;
