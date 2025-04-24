import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";

export default function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
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
    stock: "",
    count: "",
    userid: "",
    image: null,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }

    fetchFood();
    fetchPets();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await fetch(baseUrl + `getfood/${id}`);
      const data = await response.json();
      if (data) {
        setFormData({
          itemname: data.itemname,
          quantity: data.quantity,
          price: data.price,
          dom: data.dom,
          doe: data.doe,
          suitablefor: data.suitablefor,
          foodpreference: data.foodpreference,
          flavour: data.flavour,
          petid: data.petid,
          stock: data.stock,
          count: data.count,
          image: null,
          userid: data.userid,
        });
      }
    } catch (error) {
      console.error("Failed to fetch food details:", error);
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

    const updatedFormData = {
      ...formData,
      count: formData.stock,
    };

    const formDataToSend = new FormData();
    for (let key in updatedFormData) {
      formDataToSend.append(key, updatedFormData[key]);
    }

    try {
      const response = await fetch(baseUrl + `updatefood/${id}/`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.message === "Food item updated successfully") {
        setSuccessMsg("Food item updated successfully!");
        setTimeout(() => {
          navigate("/seller/viewFood");
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
            <h3 className="mb-4">Edit Food</h3>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
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
                  <label>Item Name</label>
                  <input
                    type="text"
                    name="itemname"
                    className="form-control"
                    value={formData.itemname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group col-6">
                  <label>Quantity (in Kg)</label>
                  <input
                    type="text"
                    name="quantity"
                    className="form-control"
                    value={formData.quantity}
                    onChange={handleChange}
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
                    required
                  />
                </div>

                <div className="form-group col-6">
                  <label>Price (₹)</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
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
                  placeholder="Enter flavour"
                  required
                />
              </div>
              <div className="form-group col-6">
  <label>Update Image</label>

  {formData.image && (
    typeof formData.image === "string" ? (
      <img
        src={`${baseUrl}${formData.image.startsWith("/") ? formData.image.slice(1) : formData.image}`}
        width="100"
        height="100"
        alt="Current Food"
        style={{ objectFit: 'cover', marginBottom: '10px' }}
      />
    ) : (
      <img
        src={URL.createObjectURL(formData.image)}
        width="100"
        height="100"
        alt="Selected Preview"
        style={{ objectFit: 'cover', marginBottom: '10px' }}
      />
    )
  )}

  <input
    type="file"
    name="image"
    className="form-control-file"
    onChange={handleFileChange}
    accept="image/*"
  />
</div>

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
