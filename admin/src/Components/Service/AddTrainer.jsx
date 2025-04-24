import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function AddTrainer() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    fees: "",
    contact: "",
    remarks: "",
    image: null,
    userid: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    if (!formData.fees) newErrors.fees = "Fees is required";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("remarks", formData.remarks);
    formDataToSend.append("photo", formData.image);
    formDataToSend.append("userid", formData.userid);
    formDataToSend.append("fees", formData.fees);

    try {
      const response = await fetch(baseUrl + "addTrainer/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Trainer added successfully!");
        setTimeout(() => {
          navigate("/service/viewTrainer");
        }, 1500);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error connecting to the server");
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Add Trainer</h1>
            </div>

            <div className="row">
              <form className="pets col-6" onSubmit={handleSubmit} encType="multipart/form-data">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Enter Experience"
                  />
                  {errors.experience && <small className="text-danger">{errors.experience}</small>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-user"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter Contact"
                  />
                  {errors.contact && <small className="text-danger">{errors.contact}</small>}
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-user"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter Remarks"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-user"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="Fees for a session"
                  />
                  {errors.fees && <small className="text-danger">{errors.fees}</small>}
                </div>

                <div className="form-group">
                  <input
                    type="file"
                    className="form-control form-control-user"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {errors.image && <small className="text-danger">{errors.image}</small>}
                </div>

                <button type="submit" className="btn btn-primary btn-user btn-block">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
