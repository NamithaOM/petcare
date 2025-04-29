import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({ petname: "", petimage: null });
  const [message, setMessage] = useState("");
  const formRef = useRef(null); // Create a reference to the form

  // Fetch pets list
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(baseUrl + "list_pets/");
      const data = await response.json();
      setPets(data.pets);
    } catch (error) {
      setMessage("Error fetching pets");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "petimage") {
      setFormData({ ...formData, petimage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check if form is valid
    if (!formRef.current.checkValidity()) {
      setMessage("Please fill out all required fields");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("petname", formData.petname);
    if (formData.petimage) {
      formPayload.append("petimage", formData.petimage);
    }

    try {
      const response = await fetch(baseUrl + "create_pet/", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setFormData({ petname: "", petimage: null }); // Reset form
        fetchPets();
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  // Update pet
  const handleUpdate = async (petId, newName, newImage) => {
    const formPayload = new FormData();
    formPayload.append("petname", newName);
    if (newImage) {
      formPayload.append("petimage", newImage);
    }

    try {
      const response = await fetch(baseUrl + `update_pet/${petId}/`, {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchPets(); // Refresh the list

        setFormData({ petname: newName, petimage: null }); // Reset the form
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error updating pet");
    }
  };

  // Delete pet
  const handleDelete = async (petId) => {
    try {
      const response = await fetch(baseUrl + `delete_pet/${petId}/`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchPets(); // Refresh the list
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error deleting pet");
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
                <h1 className="h3 mb-0 text-gray-800">Pet List</h1>
              </div>

              {/* Form */}
              <div className="row mb-5">
                <form
                  className="pets col-6"
                  onSubmit={handleSubmit}
                  ref={formRef} // Attach the form reference here
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="petname"
                      name="petname"
                      value={formData.petname}
                      onChange={handleChange}
                      placeholder="Enter pet Category"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control form-control-user"
                      id="petimage"
                      name="petimage"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                    disabled={!formData.petname || !formData.petimage}
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Success/Error message */}
              {message && <div className="alert alert-info">{message}</div>}

              {/* Pets List */}
              <div className="row">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Pets</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellSpacing="0"
                      >
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pets.map((pet) => (
                            <tr key={pet.id}>
                              <td>
                                {pet.petimage ? (
                                  <img
                                    src={baseUrl + "media/" + pet.petimage}
                                    alt={pet.petname}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control mb-2"
                                  defaultValue={pet.petname}
                                  onBlur={(e) =>
                                    handleUpdate(pet.id, e.target.value, null)
                                  }
                                  required
                                />
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={(e) =>
                                    handleUpdate(
                                      pet.id,
                                      pet.petname,
                                      e.target.files[0]
                                    )
                                  }
                                  required
                                />
                              </td>

                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(pet.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
