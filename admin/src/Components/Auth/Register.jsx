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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
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
        navigate("/");// Use `data.message` instead of hardcoded text
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
            {/* <div className="col-lg-5 d-none d-lg-block bg-register-image"></div> */}
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
                {message && <p className="text-center">{message}</p>}
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      name="contact"
                      placeholder="Contact Number"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Radio Buttons for User Type */}
                  <div className="form-group">
                    <label>User Type:</label>
                    <div>
                      <input
                        type="radio"
                        name="usertype"
                        value="Customer"
                        checked={formData.usertype === "Customer"}
                        onChange={handleChange}
                      />
                      <label className="ml-2">Customer</label>
                    </div>
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
                      <label className="ml-2">Pet Care Service</label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </button>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="/forgotpassword">
                    Forgot Password?
                  </a>
                </div>
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
