import React, { useState, useEffect, useRef } from "react";
import "../AdminComponents/css/bootstrap.min.css";
import "../AdminComponents/css/style.css";
import defaultProfilePicture from "../AdminComponents/img/default_profile_picture.PNG";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import ServerUrl from "../CommonComponents/ServerUrl";

function MyProfile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    workLocation: "",
    additionalField: "",
    workType: "",
    employeeId: "",
    image: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const lastSavedDetails = useRef({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch user details from backend on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const endpoint =
        user.usertype === 1
          ? "http://localhost:4000/fetch/customerserviceregister"
          : "http://localhost:4000/fetch/salesrepresentativeregister";

      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          const userData = data.find((item) => item.email === user.email);
          if (userData) {
            const details = {
              name: userData.regId.name,
              email: userData.email,
              phone: userData.regId.phone || "",
              role:
                user.usertype === 1
                  ? "Customer Service"
                  : "Sales Representative",
              workLocation: userData.regId.workLocation || "",
              workType: userData.regId.workType || "",
              employeeId: userData.regId.employeeId || "",
              additionalField:
                user.usertype === 1
                  ? userData.regId.shiftTiming || ""
                  : userData.regId.commissionRate || "",
              image: userData.regId.image || "",
            };
            setUserDetails(details);
            lastSavedDetails.current = details;
          }
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));

    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData();
    formData.append("image", file);
    formData.append("loginId", user._id);

    const endpoint =
      user.usertype === 1
        ? "http://localhost:4000/fetch/customerserviceeditimageupload"
        : "http://localhost:4000/fetch/salesrepresentativeeditimageupload";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok && result.imageName) {
        setUserDetails((prev) => ({ ...prev, image: result.imageName }));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            regId: {
              ...user.regId,
              image: result.imageName,
            },
          })
        );
        alert("Profile picture updated successfully!");
        window.dispatchEvent(new Event("userDataUpdated"));
        window.location.reload();
      } else {
        console.error("Upload error:", result);
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Image upload exception:", err);
      alert("Image upload error.");
    }
  };

  const handleSave = () => {
    if (isSaving) return;
    setIsSaving(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const endpoint =
      user.usertype === 1
        ? "http://localhost:4000/fetch/updatecustomerservicedetails"
        : "http://localhost:4000/fetch/updatesalesrepresentativedetails";

    const payload = {
      id: user._id,
      name: userDetails.name,
      phone: userDetails.phone,
      workLocation: userDetails.workLocation,
      additionalField: userDetails.additionalField, // Shift Timing or Commission Rate
    };

    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          alert("Profile updated successfully!");
          // Update only relevant fields in localStorage (avoid breaking backend mapping)
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...JSON.parse(localStorage.getItem("user")),
              ...payload,
            })
          );
          setIsEditable(false);
          lastSavedDetails.current = { ...userDetails };
        } else {
          alert("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Update failed. Please try again.");
      })
      .finally(() => setIsSaving(false));
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setUserDetails({ ...lastSavedDetails.current });
    setIsEditable(false);
  };

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminNavbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            {/* Left Side: Profile Picture */}
            <div className="col-sm-12 col-xl-4">
              <div className="bg-light rounded h-100 p-4 d-flex flex-column justify-content-between align-items-center text-center">
                <h4 className="mb-3">Profile Picture</h4>
                {/* Replace src with actual profile picture fetch logic later */}
                <img
                  className="img-fluid rounded-circle mb-3"
                  src={
                    preview
                      ? preview
                      : userDetails.image
                      ? ServerUrl + userDetails.image
                      : defaultProfilePicture
                  }
                  alt="Profile"
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    border: "2px solid #ddd",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />

                <label className="btn btn-outline-primary mt-3">
                  Upload New
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
            </div>

            {/* Right Side: Profile Details Form */}
            <div className="col-sm-12 col-xl-8">
              <div className="bg-light rounded p-4">
                <h4 className="mb-4">Profile Details</h4>
                <form>
                  <div className="row g-4">
                    {/* Name */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={userDetails.name}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email (non-editable)
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={userDetails.email}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={userDetails.phone}
                          onChange={handleInputChange}
                          disabled={!isEditable}
                        />
                      </div>
                    </div>
                    {/* Role */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="role" className="form-label">
                          Role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="role"
                          name="role"
                          value={userDetails.role}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Employee ID (non-editable) */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="employeeId" className="form-label">
                          Employee ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="employeeId"
                          name="employeeId"
                          value={userDetails.employeeId}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Work Location */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="workLocation" className="form-label">
                          Work Location
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="workLocation"
                          name="workLocation"
                          value={userDetails.workLocation}
                          onChange={handleInputChange}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Work Type (non-editable) */}
                    <div className="col-sm-12 col-xl-6">
                      <div className="mb-3">
                        <label htmlFor="workType" className="form-label">
                          Work Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="workType"
                          name="workType"
                          value={userDetails.workType}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Shift Timing or Commission Rate */}
                    {userDetails.role === "Customer Service" && (
                      <div className="col-sm-12 col-xl-6">
                        <div className="mb-3">
                          <label htmlFor="shiftTiming" className="form-label">
                            Shift Timing
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="shiftTiming"
                            name="shiftTiming"
                            value={userDetails.additionalField}
                            disabled
                          />
                        </div>
                      </div>
                    )}
                    {userDetails.role === "Sales Representative" && (
                      <div className="col-sm-12 col-xl-6">
                        <div className="mb-3">
                          <label
                            htmlFor="commissionRate"
                            className="form-label"
                          >
                            Commission Rate
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="commissionRate"
                            name="commissionRate"
                            value={userDetails.additionalField}
                            disabled
                          />
                        </div>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="col-sm-12 d-flex justify-content-between">
                      <div>
                        {isEditable ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-primary px-4 me-2"
                              onClick={handleSave}
                              disabled={isSaving}
                            >
                              {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger px-4"
                              onClick={handleCancel}
                              disabled={isSaving}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-secondary px-4"
                            onClick={() => setIsEditable(true)}
                          >
                            Edit Profile
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
