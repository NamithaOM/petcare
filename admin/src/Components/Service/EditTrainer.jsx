import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function EditTrainer() {
  const { id } = useParams(); // Get trainer ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    contact: "",
    remarks: "",
    fees: "",
    image: null,
    userid: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}viewTrainer/${id}/`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            name: data.name,
            experience: data.experience,
            contact: data.contact,
            remarks: data.remarks,
            fees: data.fees,
            userid: data.userid,
            photo: data.photo, // <-- Add this line

          });
          setPreviewImage(data.photo);
        } else {
          alert(data.error || "Failed to fetch trainer details");
        }
      } catch (error) {
        alert("Error connecting to the server");
      }
    };

    fetchTrainerDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("remarks", formData.remarks);
    formDataToSend.append("fees", formData.fees)
    if (formData.image) {
      formDataToSend.append("photo", formData.image);
    }

    try {
      const response = await fetch(`${baseUrl}editTrainer/${id}/`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Trainer details updated successfully!");
        setTimeout(() => navigate("/service/viewTrainer"), 2000);
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
            <h1 className="h3 mb-4 text-gray-800">Edit Trainer</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="row">
              <form className="pets col-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="fees" value={formData.fees} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <textarea className="form-control" name="remarks" value={formData.remarks} onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                   {formData.photo ? (
                                                <img
                                                  src={`${baseUrl}${formData.photo}`}
                                                  alt="Trainer"
                                                  style={{ width: "100px", height: "100px" }}
                                                  className="img-thumbnail"
                                                />
                                              ) : (
                                                "No Photo"
                                              )}
                  <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                  {previewImage && <img src={previewImage} alt="Preview" className="img-thumbnail mt-2" width="100" />}
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Trainer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
