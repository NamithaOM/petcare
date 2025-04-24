import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function AddGrooming() {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    price: "",
    products: "",
    userid: "",
    photo: null, // for image file
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
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.products.trim()) newErrors.products = "Products field is required";
    if (!formData.photo) newErrors.photo = "Photo is required";
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
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("products", formData.products);
    formDataToSend.append("userid", formData.userid);
    formDataToSend.append("photo", formData.photo);

    try {
      const response = await fetch(baseUrl + "addGrooming/", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Grooming details added successfully!");
        setFormData({
          name: "",
          duration: "",
          description: "",
          price: "",
          products: "",
          userid: formData.userid,
          photo: null,
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
            <h1 className="h3 mb-4 text-gray-800">Add Grooming Service</h1>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errors.form && <div className="alert alert-danger">{errors.form}</div>}
            <form className="col-md-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Grooming Name" />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="duration" value={formData.duration} onChange={handleChange} placeholder="Enter Duration" />
                {errors.duration && <small className="text-danger">{errors.duration}</small>}
              </div>
              <div className="form-group">
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} placeholder="Enter Description" />
                {errors.description && <small className="text-danger">{errors.description}</small>}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="Enter Price" />
                {errors.price && <small className="text-danger">{errors.price}</small>}
              </div>
              <div className="form-group">
                <textarea className="form-control" name="products" value={formData.products} onChange={handleChange} placeholder="Enter Products used" />
                {errors.products && <small className="text-danger">{errors.products}</small>}
              </div>
              <div className="form-group">
                <input type="file" className="form-control" name="photo" onChange={handleFileChange} />
                {errors.photo && <small className="text-danger">{errors.photo}</small>}
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
