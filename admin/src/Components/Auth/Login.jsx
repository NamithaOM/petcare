import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import AuthContext
import { jwtDecode } from "jwt-decode"; // Make sure jwt-decode is correctly imported
import dogImage from "../../assets/img/Bg/pets1.jpg";
import { baseUrl } from "../../util/BaseUrl";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before making the request

    try {
      const response = await fetch(baseUrl+"login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Decode the JWT token to extract the userType and other details
        const decodedToken = jwtDecode(data.token);

        // Log decoded token to check the userType and other details
        console.log(decodedToken); // Check the structure of the decoded token

        // Check if decodedToken has userType
        if (decodedToken.userType) {
          // Store the token and userType in context (if needed)
          // login(data.token, decodedToken.userType);
          login(data.token, decodedToken.userType, data.user_id);
       

          // Navigate based on the userType
          switch (decodedToken.userType.toLowerCase()) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "seller":
              navigate("/seller/dashboard");
              break;
            case "service":
              navigate("/service");
              break;
            default:
              navigate("/"); // Fallback route
          }
        } else {
          setError("Invalid user type.");
        }
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div
                className="col-lg-5 d-none d-lg-block"
                style={{
                  backgroundImage: `url(${dogImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form className="user" onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        placeholder="Enter Email Address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </form>
                  <hr />
                  {/* <div className="text-center">
                    <a className="small" href="/forgotpassword">
                      Forgot Password?
                    </a>
                  </div> */}
                  <div className="text-center">
                    <a className="small" href="/register">
                      Create an Account!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
