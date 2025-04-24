import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function PetsList() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({ petname: "" });
  const [message, setMessage] = useState("");

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(baseUrl + "create_pet/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchPets(); // Refresh the list
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  // Update pet
  const handleUpdate = async (petId, newName) => {
    try {
      const response = await fetch(baseUrl + `update_pet/${petId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petname: newName }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        fetchPets(); // Refresh the list
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
                <form className="pets col-6" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="petname"
                      name="petname"
                      value={formData.petname}
                      onChange={handleChange}
                      placeholder="Enter pet Category"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
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
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pets.map((pet) => (
                            <tr key={pet.id}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={pet.petname}
                                  onBlur={(e) =>
                                    handleUpdate(pet.id, e.target.value)
                                  }
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
