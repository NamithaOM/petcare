import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";

export default function AllTrainers() {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allTrainers/")
      .then((res) => res.json())
      .then((data) => setTrainers(data.Trainers))
      .catch((err) => console.error("Error fetching trainers:", err));
  }, []);

  const handleDeleteTrainer = (trainerId) => {
    if (!window.confirm("Are you sure you want to delete this trainer?"))
      return;

    fetch(baseUrl + `deleteTrainer/${trainerId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setTrainers(trainers.filter((t) => t.id !== trainerId)); // update UI
      })
      .catch((err) => console.error("Error deleting trainer:", err));
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Trainer List</h1>
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
                      <th>Remarks</th>
                      <th>Contact</th>
                      <th>Fees</th>
                      <th>Service Center</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainers.map((trainer) => (
                      <tr key={trainer.id}>
                        <td>
                          {trainer.photo ? (
                            <img
                              src={baseUrl + trainer.photo.replace(/^\/+/, "")}
                              alt={trainer.name}
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
                        <td>{trainer.name}</td>
                        <td>{trainer.experience}</td>
                        <td>{trainer.remarks}</td>
                        <td>{trainer.contact}</td>
                        <td>{trainer.fees}</td>
                        <td>{trainer.serviceCenter}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteTrainer(trainer.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {trainers.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No trainers found.
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
