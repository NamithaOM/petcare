import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";

export default function AddAccessory() {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accessoryName: "",
    brand: "",
    price: "",
    stock: "",
    petid: "",
    image: null,
    userid: "",
    description: "",
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("accessoryName", formData.accessoryName);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("petid", formData.petid);
    formDataToSend.append("userid", formData.userid);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    try {
      const response = await fetch(baseUrl + "addaccessory/", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Accessory added successfully!");
        setFormData({
          accessoryName: "",
          brand: "",
          price: "",
          stock: "",
          petid: "",
          image: null,
          userid: formData.userid,
          description: "",
          category: "",
        });
        setTimeout(() => {
          navigate("/seller/viewAccessories");
        }, 1500);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error connecting to the server");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(baseUrl + "list_pets/");
      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      setMessage("Error fetching pets");
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Add Accessory</h1>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {message && <div className="alert alert-danger">{message}</div>}
            <form
              className="mt-4 mb-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>Select Pet</label>
                <select
                  name="petid"
                  className="form-control"
                  value={formData.petid}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.petname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Accessory Name</label>
                  <input
                    type="text"
                    name="accessoryName"
                    className="form-control"
                    value={formData.accessoryName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-control"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
         
              <div className="form-group col-md-6">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Accessory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
