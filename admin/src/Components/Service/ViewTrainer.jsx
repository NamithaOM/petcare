import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";
import { useNavigate } from 'react-router-dom';

export default function ViewTrainer() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchTrainerDetails(storedUserId);
    }
  }, []);

  const fetchTrainerDetails = async (id) => {
    try {
      const response = await fetch(`${baseUrl}viewTrainersByUser/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setTrainers(data);
      } else {
        alert(data.error || "Trainers not found");
      }
    } catch (error) {
      alert("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}deleteTrainer/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== id));
        alert('Trainer deleted successfully');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete Trainer');
      }
    } catch (err) {
      alert('Error deleting trainer');
    }
  };

  const handleEdit = (id) => {
    navigate(`/service/editTrainer/${id}`);
  };

  
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">My Trainers</h1>
            <button className="btn btn-success mb-3" onClick={() => navigate('/service/addTrainer')}>
              Add Trainer
            </button>
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Experience</th>
                        <th>Contact</th>                       
                        <th>Fees</th>
                        <th>Photo</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer, index) => (
                        <tr key={trainer.id}>
                          <td>{index + 1}</td>
                          <td>{trainer.name}</td>
                          <td>{trainer.experience}</td>
                          <td>{trainer.contact}</td>
                          <td>{trainer.fees}</td>

                          <td>
                            {trainer.photo ? (
                              <img
                                src={`${baseUrl}media/${trainer.photo}`}
                                alt="Trainer"
                                style={{ width: "100px", height: "100px" }}
                                className="img-thumbnail"
                              />
                            ) : (
                              "No Photo"
                            )}
                          </td>
                          <td>{trainer.remarks}</td>
                          <td>
                            <button onClick={() => handleEdit(trainer.id)} className="btn btn-primary btn-sm mr-2">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(trainer.id)} className="btn btn-danger btn-sm">
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
  );
}
