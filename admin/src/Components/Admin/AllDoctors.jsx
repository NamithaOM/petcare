import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allDoctors/")
      .then((res) => res.json())
      .then((data) => setDoctors(data.Doctors))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const handleDeleteDoctor = (doctorId) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    fetch(baseUrl + `deleteDoctor/${doctorId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setDoctors(doctors.filter((doc) => doc.id !== doctorId)); // remove from UI
      })
      .catch((err) => console.error("Error deleting doctor:", err));
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Doctor List</h1>
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
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Experience</th>
                      <th>Qualification</th>
                      <th>Contact</th>
                      <th>Fees</th>
                      <th>Remarks</th>
                      <th>Company</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doctor) => (
                      <tr key={doctor.id}>
                        <td>
                          {doctor.photo ? (
                            <img
                              src={baseUrl + doctor.photo.replace(/^\/+/, "")}
                              alt={doctor.name}
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
                        <td>{doctor.name}</td>
                        <td>{doctor.experience}</td>
                        <td>{doctor.qualification}</td>
                        <td>{doctor.contact}</td>
                        <td>{doctor.fees}</td>
                        <td>{doctor.remarks}</td>
                        <td>{doctor.company_name}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteDoctor(doctor.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {doctors.length === 0 && (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No doctors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
