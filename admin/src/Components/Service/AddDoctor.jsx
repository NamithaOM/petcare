import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    qualification: "",
    contact: "",
    fees:"",
    image: null,
    remarks: "",  // Added remarks field
    userid: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.experience.trim()) newErrors.experience = "Experience is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.fees) newErrors.image = "Fees is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSuccessMessage("");
    setErrors({});

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("qualification", formData.qualification);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("fees", formData.fees);
    formDataToSend.append("remarks", formData.remarks); // Sending remarks
    formDataToSend.append("photo", formData.image);
    formDataToSend.append("userid", formData.userid);

    try {
      const response = await fetch(baseUrl + "addDoctor/", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Doctor added successfully!");
        setFormData({
          name: "",
          experience: "",
          qualification: "",
          contact: "",
          fees:"",
          image: null,
          remarks: "",  // Reset remarks
          userid: formData.userid,
        });
      } else {
        setErrors({ form: data.error || "Something went wrong" });
      }
    } catch (error) {
      setErrors({ form: "Error connecting to the server" });
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Add Doctor</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
            <form className="col-md-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Full Name" />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter Experience" />
                {errors.experience && <small className="text-danger">{errors.experience}</small>}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Enter Qualification" />
                {errors.qualification && <small className="text-danger">{errors.qualification}</small>}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter Contact" />
                {errors.contact && <small className="text-danger">{errors.contact}</small>}
              </div>
              <div className="form-group">
                <input type="number" className="form-control" name="fees" value={formData.fees} onChange={handleChange} placeholder="Fees for a session" />
                {errors.contact && <small className="text-danger">{errors.fees}</small>}
              </div>
              <div className="form-group">
                <input type="file" className="form-control" name="image" onChange={handleFileChange} accept="image/*" />
                {errors.image && <small className="text-danger">{errors.image}</small>}
              </div>
              {/* Added Remarks Input Field */}
              <div className="form-group">
                <textarea className="form-control" name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Enter Remarks"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
