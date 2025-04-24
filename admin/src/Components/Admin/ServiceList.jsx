import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";
import { baseUrl } from "../../util/BaseUrl";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ servicename: "" });
  const [editingService, setEditingService] = useState(null); // Track service being edited

  // Fetch services from backend
  useEffect(() => {
    fetch(`${baseUrl}list_servicename/`)
      .then((res) => res.json())
      .then((data) => setServices(data.servicename))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingService) {
      // Update service
      fetch(`${baseUrl}update_servicename/${editingService}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setServices(services.map(service =>
              service.id === editingService ? { id: service.id, servicename: formData.servicename } : service
            ));
            setEditingService(null);
            setFormData({ servicename: "" });
          }
        })
        .catch((error) => console.error("Error updating service:", error));
    } else {
      // Create service
      fetch(`${baseUrl}create_servicename/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setServices([...services, { id: data.id, servicename: formData.servicename }]);
            setFormData({ servicename: "" });
          }
        })
        .catch((error) => console.error("Error adding service:", error));
    }
  };

  // Delete service
  const deleteService = (id) => {
    fetch(`${baseUrl}delete_servicename/${id}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setServices(services.filter(service => service.id !== id)))
      .catch((error) => console.error("Error deleting service:", error));
  };

  // Edit service
  const editService = (id, name) => {
    setEditingService(id);
    setFormData({ servicename: name });
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
                <h1 className="h3 mb-0 text-gray-800">Pet Services List</h1>
              </div>
              <div className="row mb-5">
                <form className="pets col-6" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-user"
                      id="servicename"
                      name="servicename"
                      value={formData.servicename}
                      onChange={handleChange}
                      placeholder="Enter service name"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-user btn-block">
                    {editingService ? "Update" : "Submit"}
                  </button>
                </form>
              </div>
              <div className="row">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Services</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" width="100%" cellSpacing="0">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {services.map((service) => (
                            <tr key={service.id}>
                              <td>{service.servicename}</td>
                              <td>
                                <button className="btn btn-success mx-2" onClick={() => editService(service.id, service.servicename)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deleteService(service.id)}>Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {services.length === 0 && <p>No services available.</p>}
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
