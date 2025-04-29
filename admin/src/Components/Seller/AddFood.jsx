import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";

export default function AddFood() {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Initialize form data state
  const [formData, setFormData] = useState({
    itemname: "",
    quantity: "",
    price: "",
    dom: "",
    doe: "",
    suitablefor: "",
    foodpreference: "",
    flavour: "",
    petid: "",
    image: null,
    userid: "",
    stock: "",
    count: "",
  });

  // Set user ID when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const updatedFormData = {
      ...formData,
      count: formData.stock, // Set count to be same as stock
    };

    for (let key in updatedFormData) {
      formDataToSend.append(key, updatedFormData[key]);
    }

    try {
      const response = await fetch(baseUrl + "addfood/", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Food item added successfully!");

        // Clear form data after successful submission
        setFormData({
          itemname: "",
          quantity: "",
          price: "",
          dom: "",
          doe: "",
          suitablefor: "",
          foodpreference: "",
          flavour: "",
          petid: "",
          stock: "",
          count: "",
          image: null,
          userid: formData.userid, // Maintain the user id
        });

        setTimeout(() => {
          navigate("/seller/viewFood");
        }, 1500);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error connecting to the server");
    }
  };

  // Fetch pets for the dropdown
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
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Add Food</h1>
              </div>

              {/* Success message */}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              {/* Error message */}
              {message && <div className="alert alert-danger">{message}</div>}
              <div className="container-fluid mt-4">
                <div className="row">
                  <div className="col">
                    <form
                      className="col-12 mb-4"
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
                        <div className="form-group col-6">
                          <label>Item Name</label>
                          <input
                            type="text"
                            name="itemname"
                            className="form-control"
                            value={formData.itemname}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                          />
                        </div>

                        <div className="form-group col-6">
                          <label>Quantity (in Kg)</label>
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-6">
                          <label>Stock</label>
                          <input
                            type="number"
                            name="stock"
                            className="form-control"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="No. of stock"
                            required
                          />
                        </div>

                        <div className="form-group col-6">
                          <label>Price</label>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-6">
                          <label>Date of Manufacturing</label>
                          <input
                            type="date"
                            name="dom"
                            className="form-control"
                            value={formData.dom}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-group col-6">
                          <label>Date of Expiry</label>
                          <input
                            type="date"
                            name="doe"
                            className="form-control"
                            value={formData.doe}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-6">
                          <label>Suitable For</label>
                          <select
                            name="suitablefor"
                            className="form-control"
                            value={formData.suitablefor}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-- Select --</option>
                            <option>New born</option>
                            <option>Young</option>
                            <option>Adult</option>
                            <option>All age</option>
                          </select>
                        </div>

                        <div className="form-group col-6">
                          <label>Food Preference</label>
                          <select
                            name="foodpreference"
                            className="form-control"
                            value={formData.foodpreference}
                            onChange={handleChange}
                            required
                          >
                            <option value="">-- Select --</option>
                            <option>Non vegetarian</option>
                            <option>Vegetarian</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-6">
                          <label>Flavour</label>
                          <input
                            type="text"
                            name="flavour"
                            className="form-control"
                            value={formData.flavour}
                            onChange={handleChange}
                            placeholder="Chicken, beef, etc"
                            required
                          />
                        </div>

                        <div className="form-group col-6">
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

                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
