import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";
import { baseUrl } from "../../util/BaseUrl";

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null); // Track service being edited
  const [formData, setFormData] = useState({
    servicename: "",
    serviceimage: null,
  });

  // Fetch services from backend
  useEffect(() => {
    fetch(`${baseUrl}list_servicename/`)
      .then((res) => res.json())
      .then((data) => setServices(data.servicename))
      .catch((error) => console.error("Error fetching services:", error));
  }, [services]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "serviceimage") {
      setFormData({ ...formData, serviceimage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("servicename", formData.servicename);
    if (formData.serviceimage) {
      data.append("serviceimage", formData.serviceimage);
    }

    if (editingService) {
      fetch(`${baseUrl}update_servicename/${editingService}/`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setServices((prev) =>
              prev.map((service) =>
                service.id === editingService
                  ? { ...service, servicename: formData.servicename }
                  : service
              )
            );
            setEditingService(null);
            setFormData({ servicename: "", serviceimage: null });
          }
        })
        .catch((error) => console.error("Error updating service:", error));
    } else {
      fetch(`${baseUrl}create_servicename/`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setServices([
              ...services,
              { id: data.id, servicename: formData.servicename },
            ]);
            setFormData({ servicename: "", serviceimage: null });
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
      .then(() => setServices(services.filter((service) => service.id !== id)))
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
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control form-control-user"
                      id="serviceimage"
                      name="serviceimage"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block"
                  >
                    {editingService ? "Update" : "Submit"}
                  </button>
                </form>
              </div>
              <div className="row">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Services
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
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
                          {services.map((service) => (
                            <tr key={service.id}>
                              <td>
                                {service.serviceimage ? (
                                  <img
                                    src={
                                      service.serviceimage.startsWith("/media/")
                                        ? baseUrl + service.serviceimage
                                        : baseUrl +
                                          "media/" +
                                          service.serviceimage.replace(
                                            /^\/+/,
                                            ""
                                          )
                                    }
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>
                              <td>{service.servicename}</td>
                              <td>
                                <button
                                  className="btn btn-success mx-2"
                                  onClick={() =>
                                    editService(service.id, service.servicename)
                                  }
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteService(service.id)}
                                >
                                  Delete
                                </button>
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
