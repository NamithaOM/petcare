import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../util/BaseUrl';
import Sidebar from '../Auth/Sidebar';
import Header from '../Auth/Header';

export default function ViewGrooming() {
  const [groomings, setGroomings] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();  // Initialize the useNavigate hook

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);
  
  useEffect(() => {
    if (userId) {
      const fetchGrooming = async () => {
        try {
          const response = await fetch(`${baseUrl}groomingList/?id=${userId}`);
          const data = await response.json();
          if (response.ok) {
            setGroomings(data.groomings || []);  // Ensure we store an array
          } else {
            setError(data.error || 'Error fetching grooming details');
          }
        } catch (err) {
          setError('Error fetching grooming details');
        }
      };
      fetchGrooming();
    }
  }, [userId]);

  // Handle edit functionality
  const handleEdit = (id) => {
    navigate(`/service/editGrooming/${id}`);
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}deleteGrooming/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGroomings((prevGroomings) => prevGroomings.filter((grooming) => grooming.id !== id));
        alert('Grooming deleted successfully');
        navigate('/service/groomingList');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete grooming');
      }
    } catch (err) {
      alert('Error deleting grooming');
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">View Grooming Services</h1>

            {/* Fix the Add button */}
            <button className="btn btn-success mb-3" onClick={() => navigate('/service/addgrooming')}>
              Add Grooming
            </button>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Products</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groomings.length > 0 ? (
                  groomings.map((grooming) => (
                    <tr key={grooming.id}>
                      <td>{grooming.name}</td>
                      <td>{grooming.description}</td>
                      <td>{grooming.duration}</td>
                      <td>{grooming.price}</td>
                      <td>{grooming.products}</td>
                      <td>
  {grooming.photo ? (
    <img
      src={grooming.photo}
      alt="grooming"
      style={{ width: "150px", height: "100px" }}
      className="img-thumbnail"
    />
  ) : (
    "No Photo"
  )}
</td>

                      <td>
                        <button onClick={() => handleEdit(grooming.id)} className="btn btn-primary btn-sm">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(grooming.id)} className="btn btn-danger btn-sm ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No grooming services available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
