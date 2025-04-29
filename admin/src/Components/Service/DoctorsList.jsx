import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchDoctors(storedUserId);
    }
  }, []);
  
  
  const fetchDoctors = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}listDoctors/?id=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setDoctors(data);
      } else {
        setError(data.error || "Error fetching doctors");
      }
    } catch (error) {
      setError("Error fetching doctors");
    }
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const response = await fetch(baseUrl + `deleteDoctor/${id}/`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Error deleting doctor");
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">View Doctor List</h1>

            {/* Fixed Add Doctor Button */}
            <button
              className="btn btn-success mb-3"
              onClick={() => navigate('/service/addDoctor')}
            >
              Add Doctor
            </button>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Experience</th>
                  <th>Qualification</th>
                  <th>Contact</th>
                  <th>Fees</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>
                      {doctor.photo ? (
                        <img
                          src={doctor.photo}
                          alt="Doctor"
                         style={{ width: "100px", height: "100px" }}
                                className="img-thumbnail"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.qualification}</td>
                    <td>{doctor.contact}</td>
                    <td>{doctor.fees}</td>
                    <td>{doctor.remarks}</td>
                    <td>
                      <Link
                        to={`/service/editDoctor/${doctor.id}`}
                        className="btn btn-primary btn-sm mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(doctor.id)}
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
  );
}
