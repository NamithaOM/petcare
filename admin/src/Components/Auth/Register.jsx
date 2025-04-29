import React, { useState } from "react";
import { baseUrl } from "../../util/BaseUrl";
import dogImage from "../../assets/img/Bg/pets2.jpg";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    usertype: "Customer", // Default selection
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    usertype: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = { name: "", email: "", contact: "", password: "", usertype: "" };
    let isValid = true;

    // Check if all fields are filled out
    if (!formData.name) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email Address is required.";
      isValid = false;
    } else {
      // Email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }
    if (!formData.contact) {
      newErrors.contact = "Contact Number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }
    if (!formData.usertype) {
      newErrors.usertype = "User Type is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    if (!validateForm()) {
      return; // Stop the submission if the form is invalid
    }

    try {
      const response = await fetch(baseUrl + "createUser/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); 
        navigate("/"); // Navigate to home after successful registration
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div
              className="col-lg-5 d-none d-lg-block"
              style={{
                backgroundImage: `url(${dogImage})`,
                backgroundSize: "90%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                {message && <p className="text-center text-danger">{message}</p>}
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-danger">{errors.email}</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      name="contact"
                      placeholder="Contact Number"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                    {errors.contact && <p className="text-danger">{errors.contact}</p>}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                  </div>

                  {/* Radio Buttons for User Type */}
                  <div className="form-group">
                    <label>User Type:</label>
                    {errors.usertype && <p className="text-danger">{errors.usertype}</p>}
                    <div>
                      <input
                        type="radio"
                        name="usertype"
                        value="Seller"
                        checked={formData.usertype === "Seller"}
                        onChange={handleChange}
                      />
                      <label className="ml-2">Merchant</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="usertype"
                        value="Service"
                        checked={formData.usertype === "Service"}
                        onChange={handleChange}
                      />
                      <label className="ml-2">Service Center</label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-user btn-block">
                    Register Account
                  </button>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="/">
                    Already have an account? Login!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
