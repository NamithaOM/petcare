import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";

export default function AddMedicine() {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    medicineName: "",
    brand: "",
    price: "",
    stock: "",
    count: "",
    dosage: "",
    usageInstructions: "",
    manufactureDate: "",
    expiryDate: "",
    petid: "",
    image: null,
    userid: "",
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const updatedFormData = {
      ...formData,
      count: formData.stock,
    };

    for (let key in updatedFormData) {
      formDataToSend.append(key, updatedFormData[key]);
    }

    try {
      const response = await fetch(baseUrl + "addmedicine/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Medicine added successfully!");

        setFormData({
          medicineName: "",
          brand: "",
          price: "",
          stock: "",
          count: "",
          dosage: "",
          usageInstructions: "",
          manufactureDate: "",
          expiryDate: "",
          petid: "",
          image: null,
          userid: formData.userid,
        });

        setTimeout(() => {
          navigate("/seller/viewMedicine");
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
            <h1 className="h3 mb-4 text-gray-800">Add Medicine</h1>

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
                  <label>Medicine Name</label>
                  <input
                    type="text"
                    name="medicineName"
                    className="form-control"
                    value={formData.medicineName}
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
              </div>

              <div className="form-row">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Manufacture Date</label>
                  <input
                    type="date"
                    name="manufactureDate"
                    className="form-control"
                    value={formData.manufactureDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    className="form-control"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Net weight/ Pills in strip</label>
                  <input
                    type="text"
                    name="dosage"
                    className="form-control"
                    value={formData.dosage}
                    onChange={handleChange}
                    placeholder="e.g. 50 ml or 10 Pills"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label> Instructions</label>
                <textarea
                  name="usageInstructions"
                  className="form-control"
                  value={formData.usageInstructions}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
