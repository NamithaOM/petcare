import React, { useState, useEffect } from "react";
import Header from '../Auth/Header';
import Footer from '../Auth/Footer';
import { baseUrl } from "../util/BaseUrl";

export default function PetDetails() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    petid: "",
    name: "",
    breed: "",
    gender: "",
    dob: "",
    age: "",
    weight: "",
    image: null,
    vaccinedata: [],
    remarks: "",
    userid:""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prev) => ({
        ...prev,
        userid: storedUserId,
      }));
    }
  }, []);
  

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(baseUrl + "list_pets/");
      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      setError("Error fetching pets");
    }
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else if (name === "vaccinedata") {
      setFormData({ ...formData, vaccinedata: Array.from(files) });
    } else if (name === "dob") {
      const today = new Date();
      const dobDate = new Date(value);
      const age = today.getFullYear() - dobDate.getFullYear();
      setFormData({ ...formData, dob: value, age: age.toFixed(1) });
    } else if (name === "age") {
      const today = new Date();
      const calculatedDob = new Date(today.setFullYear(today.getFullYear() - parseFloat(value)));
      const dobString = calculatedDob.toISOString().split('T')[0];
      setFormData({ ...formData, age: value, dob: dobString });
    } else if (type === "radio") {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const submitData = new FormData();
    submitData.append("pet", formData.petid);
    submitData.append("name", formData.name);
    submitData.append("breed", formData.breed);
    submitData.append("gender", formData.gender);
    submitData.append("dob", formData.dob);
    submitData.append("age", formData.age);
    submitData.append("weight", formData.weight);
    submitData.append("userid", formData.userid);
    submitData.append("remarks", formData.remarks);
    if (formData.image) {
      submitData.append("image", formData.image);
    }
  
    // Append multiple vaccine files
    formData.vaccinedata.forEach((file, idx) => {
      submitData.append(`vaccinedata`, file);
    });
  
    try {
      const response = await fetch(baseUrl + "add_pet/", {
        method: "POST",
        body: submitData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage("Pet details submitted successfully!");
        setError("");
        setFormData({
          petid: "",
          name: "",
          breed: "",
          gender: "",
          dob: "",
          age: "",
          weight: "",
          image: null,
          vaccinedata: [],
          remarks: "",
          userid: localStorage.getItem("userId") || "",
        });
        setImagePreview(null);
      } else {
        setError(result.message || "Failed to submit pet details.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while submitting the form.");
      setMessage("");
    }
  };
  

  return (
    <>
      <Header />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Pet Details</h3>

                      {message && <p style={{ color: 'green' }}>{message}</p>}
                      {error && <p style={{ color: 'red' }}>{error}</p>}

                      <form onSubmit={handleSubmit} className="petForm">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Select Pet</label>
                              <select name="petid" className="form-control" value={formData.petid} onChange={handleChange} required>
                                <option value="">-- Select --</option>
                                {pets.map((pet) => (
                                  <option key={pet.id} value={pet.id}>
                                    {pet.petname}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Pet Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Breed</label>
                              <input
                                type="text"
                                className="form-control"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                placeholder="Breed"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Gender</label>
                              <div>
                                <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>&nbsp;&nbsp;
                                <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>&nbsp;&nbsp;
                                <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Age (years)</label>
                              <input
                                type="number"
                                className="form-control"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="e.g., 1.5"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Date of Birth</label>
                              <input
                                type="date"
                                className="form-control"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Weight</label>
                              <input
                                type="text"
                                className="form-control"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                placeholder="e.g., 3.2 kg"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Photo</label>
                              <input
                                type="file"
                                className="form-control"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Vaccine Details (Multiple Files)</label>
                              <input
                                type="file"
                                className="form-control"
                                name="vaccinedata"
                                multiple
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Remarks</label>
                              <textarea
                                className="form-control"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                placeholder="Any additional remarks..."
                              ></textarea>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary"
                              />
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-stretch">
                    <div className="info-wrap w-100 p-5 img" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="img-fluid rounded" />
                      ) : (
                        <p className="text-center text-muted">Image preview will appear here</p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
