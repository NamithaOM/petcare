import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";

export default function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    fees:"",
    experience: "",
    qualification: "",
    contact: "",
    remarks: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(baseUrl + `viewdoctor/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setFormData(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error fetching doctor details");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("qualification", formData.qualification);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("remarks", formData.remarks);
    formDataToSend.append("fees", formData.fees);
    
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
  
    try {
      const response = await fetch(baseUrl + `editDoctor/${id}/`, {
        method: "POST",
        body: formDataToSend, // No need to set Content-Type manually, the browser does it automatically
      });
  
      const data = await response.json();
      
      if (response.ok) {
        navigate("/service/doctorList");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error updating doctor details");
    }
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  return (
   <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Edit Doctor</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="col-md-6" onSubmit={handleSubmit}>
  <div className="form-group">
    <input
      type="text"
      className="form-control"
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
      className="form-control"
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
      className="form-control"
      name="qualification"
      value={formData.qualification}
      onChange={handleChange}
      placeholder="Enter Qualification"
    />
    {errors.qualification && <small className="text-danger">{errors.qualification}</small>}
  </div>

  <div className="form-group">
    <input
      type="text"
      className="form-control"
      name="contact"
      value={formData.contact}
      onChange={handleChange}
      placeholder="Enter Contact"
    />
    {errors.contact && <small className="text-danger">{errors.contact}</small>}
  </div>
  <div className="form-group">
    <input
      type="text"
      className="form-control"
      name="fees"
      value={formData.fees}
      onChange={handleChange}
      placeholder="Enter fees"
    />
    {errors.fees && <small className="text-danger">{errors.fees}</small>}
  </div>
  <div className="form-group">
    <textarea
      className="form-control"
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
      placeholder="Enter Remarks"
    ></textarea>
  </div>

  <div className="form-group">
  Existing image <br/><img src={formData.photo} alt="Doctor" width="100" height="100" />
<br/>
    <input
      type="file"
      className="form-control"
      name="photo"
      onChange={handleFileChange}
      accept="image/*"
    />
    {errors.photo && <small className="text-danger">{errors.photo}</small>}
  </div>

  <button type="submit" className="btn btn-primary">Update</button>
</form>

    </div>
    </div>
    </div>
    </div>
  );
}
