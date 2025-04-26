import React, { useEffect, useState } from "react";
import { baseUrl } from "../util/BaseUrl";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    gender: "",
    dob: "",
    address: "",
    contact: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${baseUrl}profile/${userId}/`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.profile.name || "",
            image: null,
            gender: data.profile.gender || "",  // Assuming gender may not come
            dob: data.profile.dob ? data.profile.dob.split("T")[0] : "", // Handle null dob
            address: data.profile.address || "",
            contact: data.profile.contact || "",
          });
          if (data.profile.image_url) {
            setPreviewImage(`${baseUrl.replace(/\/$/, "")}${data.profile.image_url}`);
          } else {
            setPreviewImage(null); // No image, keep it null
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    if (userId) {
      fetchProfile();
    }
  }, [userId]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("gender", formData.gender);
      form.append("dob", formData.dob);
      form.append("address", formData.address);
      form.append("contact", formData.contact);
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch(`${baseUrl}updateprofile/${userId}/`, {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="form-group mb-3 text-center">
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="rounded-circle mb-3"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="form-group mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Profile pic:</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Gender:</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Contact:</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
