import React, { useEffect, useState } from "react";
import { baseUrl } from "../util/BaseUrl";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${baseUrl}profile/${userId}/`);
          if (response.ok) {
            const data = await response.json();
            setProfile(data.profile); // Assume backend returns { profile: {...} }
          } else {
            console.error("Error fetching profile");
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  if (!userId) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        {profile ? (
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-success">My Profile</h2>

            <div className="row">
              {/* Profile Image */}
              <div className="col-md-4 d-flex justify-content-center align-items-center">
                <img
                  src={`${baseUrl.replace(/\/$/, "")}${profile.image_url}`}
                  alt="Profile"
                  className="img-fluid rounded-circle shadow"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Profile Details */}
              <div className="col-md-8">
                <h4 className="text-uppercase">{profile.name}</h4>

                <div className="row mb-2">
                  <div className="col-4 font-weight-bold">Gender</div>
                  <div className="col-8">
                    :&nbsp;&nbsp;&nbsp;{profile.gender}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-4 font-weight-bold">Date of Birth</div>
                  <div className="col-8">
                    :&nbsp;&nbsp;&nbsp;
                    {new Date(profile.dob).toLocaleDateString("en-GB")}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-4 font-weight-bold">Address</div>
                  <div className="col-8">
                    :&nbsp;&nbsp;&nbsp;{profile.address}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-4 font-weight-bold">Contact</div>
                  <div className="col-8">
                    :&nbsp;&nbsp;&nbsp;{profile.contact}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-4 font-weight-bold">Joined Date</div>
                  <div className="col-8">
                    :&nbsp;&nbsp;&nbsp;
                    {new Date(profile.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </div>

                <button
                  className="btn btn-warning mt-3"
                  onClick={() => navigate(`/updateprofile/${profile.id}`)}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4>No profile found.</h4>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
