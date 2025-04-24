import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";

export default function EditAccessory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    accessory_name: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    petid: "",
    userid: "",
    image: null,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
    fetchAccessory();
    fetchPets();
  }, []);

  const fetchAccessory = async () => {
    try {
      const response = await fetch(baseUrl + `get_accessory/${id}`);
      const data = await response.json();
      console.log(data); // Log the data to see its structure
      if (data) {
        setFormData({
          accessory_name: data.accessory_name,
          brand: data.brand,
          price: data.price,
          stock: data.stock,
          description: data.description,
          petid: data.petid,
          userid: data.userid,
          image: null,
        });
      }
    } catch (error) {
      console.error("Failed to fetch accessory details:", error);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await fetch(baseUrl + "list_pets/");
      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
  };

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
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      const response = await fetch(baseUrl + `edit_accessory/${id}/`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMsg("Accessory updated successfully!");
        setTimeout(() => {
          navigate("/seller/viewAccessories");
        }, 1500);
      } else {
        alert(data.error || "Update failed");
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
            <h3 className="mb-4">Edit Accessory</h3>
            {successMsg && (
              <div className="alert alert-success">{successMsg}</div>
            )}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <label>Accessory Name</label>
                  <input
                    type="text"
                    name="accessory_name"
                    className="form-control"
                    value={formData.accessory_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-6">
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
                  <div className="form-group col-6">
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
                  <div className="form-group col-6">
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
              <div className="form-group">
                <label>Update Image</label>
                {formData.image &&
                  (typeof formData.image === "string" ? (
                    <img
                      src={`${baseUrl}${
                        formData.image.startsWith("/")
                          ? formData.image.slice(1)
                          : formData.image
                      }`}
                      width="100"
                      height="100"
                      alt="Current Accessory"
                      style={{ objectFit: "cover", marginBottom: "10px" }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      width="100"
                      height="100"
                      alt="Selected Preview"
                      style={{ objectFit: "cover", marginBottom: "10px" }}
                    />
                  ))}
                <input
                  type="file"
                  name="image"
                  className="form-control-file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
