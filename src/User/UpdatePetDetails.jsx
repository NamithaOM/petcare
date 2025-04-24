import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../util/BaseUrl";
import Footer from "../Auth/Footer";
import Header from "../Auth/Header";

const UpdatePetDetails = () => {
  const { id } = useParams();
  // pet ID from URL
  console.log(id);

  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    gender: "",
    dob: "",
    age: "",
    weight: "",
    remarks: "",
    userid: "",
    pet: "",
    image: null,
    vaccinedata: [],
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    fetch(`${baseUrl}view_onepet/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const petData = data.data;
        setFormData({
          ...formData,
          name: petData.name || "",
          breed: petData.breed || "",
          gender: petData.gender || "",
          dob: petData.dob || "",
          age: petData.age || "",
          weight: petData.weight || "",
          remarks: petData.remarks || "",
          userid: petData.userid || "",
          pet: petData.pet || "",
          vaccinedata: petData.vaccinedata || [], // ✅ Add this line
        });

        // ✅ Fix the URL (avoid double slash)
        if (petData.image) {
          const cleanedBaseUrl = baseUrl.endsWith("/")
            ? baseUrl.slice(0, -1)
            : baseUrl;
          const cleanedImagePath = petData.image.startsWith("/")
            ? petData.image.slice(1)
            : petData.image;
          setImagePreview(`${cleanedBaseUrl}/${cleanedImagePath}`);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch pet:", err);
        setError("Failed to fetch pet details");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "vaccinedata") {
      setFormData({ ...formData, vaccinedata: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    for (let key in formData) {
      if (key === "vaccinedata") {
        for (let file of formData.vaccinedata) {
          updatedData.append("vaccinedata", file);
        }
      } else {
        updatedData.append(key, formData[key]);
      }
    }

    try {
      await fetch(`${baseUrl}update_petdata/${id}/`, {
        method: "POST", // or PUT depending on your backend
        body: updatedData,
      });

      alert("Pet updated successfully");
      navigate("/petprofile"); // redirect to pet list
    } catch (err) {
      console.error("Error updating pet:", err);
      alert("Failed to update pet");
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
      setError("Error fetching pets");
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

                      {message && <p style={{ color: "green" }}>{message}</p>}
                      {error && <p style={{ color: "red" }}>{error}</p>}

                      <form onSubmit={handleSubmit} className="petForm">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Select Pet</label>
                              <select
                                name="petid"
                                className="form-control"
                                value={formData.pet}
                                onChange={handleChange}
                                required
                              >
                                {/* <select name="petid" className="form-control" value={formData.id} onChange={handleChange} required> */}
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
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Male"
                                  checked={formData.gender === "Male"}
                                  onChange={handleChange}
                                />{" "}
                                Male
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Female"
                                  checked={formData.gender === "Female"}
                                  onChange={handleChange}
                                />{" "}
                                Female
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value="Other"
                                  checked={formData.gender === "Other"}
                                  onChange={handleChange}
                                />{" "}
                                Other
                              </label>
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
                                required={!imagePreview}
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
                                required={
                                  !formData.vaccinedata ||
                                  formData.vaccinedata.length === 0
                                }
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

                  <div className="col-md-5 d-flex align-items-stretch flex-column">
                    <div
                      className="info-wrap w-100 p-5 img mb-4"
                      style={{ background: "#f8f9fa", borderRadius: "10px" }}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-fluid rounded"
                        />
                      ) : (
                        <p className="text-center text-muted">
                          Image preview will appear here
                        </p>
                      )}
                    </div>

                    <div className="info-wrap w-100 p-5">
                      <h3> Vaccine Details</h3>
                      {formData.vaccinedata &&
                        Array.isArray(formData.vaccinedata) &&
                        formData.vaccinedata.length > 0 && (
                          <ul>
                            {formData.vaccinedata
                              .filter(Boolean) // Filter out falsy values
                              .map((file, index) => {
                                const cleanedBaseUrl = baseUrl.endsWith("/")
                                  ? baseUrl.slice(0, -1)
                                  : baseUrl;
                                const cleanedFilePath = file.startsWith("/")
                                  ? file.slice(1)
                                  : file;
                                const fullUrl = `${cleanedBaseUrl}/media/${cleanedFilePath}`;

                                return (
                                  <li key={index}>
                                    <a
                                      href={fullUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {file.split("/").pop()}
                                    </a>
                                  </li>
                                );
                              })}
                          </ul>
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
};

export default UpdatePetDetails;
