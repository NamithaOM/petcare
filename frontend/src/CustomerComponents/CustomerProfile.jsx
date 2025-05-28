import React, { useState, useEffect, useRef } from "react";
import "../AdminComponents/css/bootstrap.min.css";
import "../AdminComponents/css/style.css";
import defaultProfilePicture from "../AdminComponents/img/default_profile_picture.PNG";
import ServerUrl from "../CommonComponents/ServerUrl";
import Header from "../HomepageComponents/Header";

function CustomerProfile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    dob: "",
    image: "",
  });

  const [isEditable, setIsEditable] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const lastSavedDetails = useRef({});
  const user = useRef(JSON.parse(localStorage.getItem("user"))); // Store user reference

  // Load user data from backend on component mount
  useEffect(() => {
    if (user.current && user.current.usertype === 0) {
      fetch("http://localhost:4000/fetch/customerregister")
        .then((res) => res.json())
        .then((data) => {
          const customer = data.find((c) => c.email === user.current.email);
          if (customer) {
            const formattedDetails = {
              name: customer.regId.name,
              email: customer.email,
              address: customer.regId.address,
              phone: customer.regId.phone,
              gender: customer.regId.gender,
              dob: customer.regId.dob?.substring(0, 10) || "",
              image: customer.regId.image || "",
            };

            setUserDetails(formattedDetails);
            lastSavedDetails.current = { ...formattedDetails };
          }
        })
        .catch((err) => console.error("Error fetching customer:", err));
    }
  }, []);

  // Update user details in database and localStorage
  const handleSave = async () => {
    if (isSaving) return; // Prevent multiple save attempts
    setIsSaving(true);

    try {
      // 1. Save user details
      const detailsPayload = {
        id: user.current._id,
        name: userDetails.name,
        address: userDetails.address,
        phone: userDetails.phone,
        gender: userDetails.gender,
        dob: userDetails.dob,
      };

      const detailsResponse = await fetch(
        "http://localhost:4000/fetch/updatecustomerdetails",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detailsPayload),
        }
      );

      const detailsResult = await detailsResponse.json();

      if (!detailsResult.success) {
        throw new Error("Failed to update profile details");
      }

      // 2. Upload image if selected
      let imageUrl = userDetails.image;
      if (selectedImage) {
        const imageResult = await handleImageUpload();
        if (imageResult && imageResult.imageName) {
          imageUrl = imageResult.imageName;
        }
      }

      // 3. Update localStorage with new information
      const updatedUser = {
        ...user.current,
        regId: {
          ...user.current.regId,
          name: userDetails.name,
          address: userDetails.address,
          phone: userDetails.phone,
          gender: userDetails.gender,
          dob: userDetails.dob,
          image: imageUrl,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      user.current = updatedUser;

      // 4. Update component state
      setUserDetails((prev) => ({
        ...prev,
        image: imageUrl,
      }));

      lastSavedDetails.current = {
        ...userDetails,
        image: imageUrl,
      };

      // 5. Notify other components about the update
      window.dispatchEvent(new Event("userDataUpdated"));

      // 6. Reset UI state
      setIsEditable(false);
      setSelectedImage(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle image upload as a separate function returning a Promise
  const handleImageUpload = async () => {
    if (!selectedImage || !user.current) return null;

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("loginId", user.current._id);

    try {
      const response = await fetch(
        "http://localhost:4000/fetch/customereditimageupload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // No need to update userDetails.image here - will be set after successful upload
      setIsEditable(true); // Enable editing when image is picked
    }
  };

  // Cancel editing and revert changes
  const handleCancel = () => {
    setUserDetails({ ...lastSavedDetails.current });
    setSelectedImage(null);
    setIsEditable(false);
  };

  return (
    <>
    <Header/>
      <div className="container-fluid pt-4 px-4 mt-5">
        <div className="row g-4">
          {/* Left Side - Profile Picture */}
          <div className="col-sm-12 col-xl-4">
            <div className="bg-light rounded h-100 p-4 d-flex flex-column justify-content-between align-items-center text-center">
              {/* Title on top */}
              <h4 className="mb-3">Profile Picture</h4>

              {/* Image center */}
              <img
                className="img-fluid rounded-circle mb-3"
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : userDetails.image
                    ? ServerUrl + userDetails.image
                    : defaultProfilePicture
                }
                alt="Profile"
                style={{
                  width: 350,
                  height: 350,
                  objectFit: "cover",
                  border: selectedImage
                    ? "3px solid #0d6efd"
                    : "2px solid #ddd",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease-in-out",
                }}
              />

              {/* Upload button */}
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

          {/* Right Side - Form */}
          <div className="col-sm-12 col-xl-8">
            <div className="bg-light rounded p-4">
              <h4 className="mb-4">Profile Details</h4>
              <form>
                <div className="row g-4">
                  {/* Name */}
                  <div className="col-sm-12 col-xl-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
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

                  {/* Address */}
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows="3"
                        value={userDetails.address || ""}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                      ></textarea>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-sm-12 col-xl-6">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={userDetails.phone || ""}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="col-sm-12 col-xl-6">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={userDetails.gender || ""}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-sm-12 col-xl-6">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={userDetails.dob || ""}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="col-sm-12 d-flex justify-content-between">
                    {/* Left-aligned: Edit/Save Button */}
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

                    {/* Right-aligned: Back Button */}
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-primary px-4"
                        onClick={() => window.history.back()}
                        disabled={isSaving}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerProfile;
