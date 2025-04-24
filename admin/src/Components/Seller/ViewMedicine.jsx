import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function ViewMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setMessage("User not logged in.");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchMedicineItems(userId);
    }
  }, [userId]);

  const fetchMedicineItems = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}view_medicine/${userId}/`);
      const data = await response.json();
      if (response.ok) {
        setMedicines(data.medicines);
      } else {
        setMessage(data.error || "Failed to load medicine items");
      }
    } catch (error) {
      setMessage("Error fetching medicine items.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;
    const response = await fetch(baseUrl + `delete_medicine/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.message === "Medicine deleted successfully") {
      alert("Deleted successfully!");
      fetchMedicineItems(userId);
    } else {
      alert("Delete failed.");
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">
            <div className="row mb-4">
              <div className="col-md-9">
                <h3 className="text-gray-800">My Medicine Items</h3>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/seller/addmedicine")}
                >
                  Add Medicine
                </button>
              </div>
            </div>{" "}
            {message && <div className="alert alert-danger">{message}</div>}
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Medicine Name</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Manufactured Date</th>
                      <th>Expiry Date</th>
                      <th>Dosage</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.length > 0 ? (
                      medicines.map((medicine) => (
                        <tr key={medicine.id}>
                          <td>
                            <img
                              src={`${baseUrl}${
                                medicine.image.startsWith("/")
                                  ? medicine.image.slice(1)
                                  : medicine.image
                              }`}
                              width="100"
                              height="100"
                            />
                          </td>
                          <td>{medicine.medicine_name}</td>
                          <td>{medicine.brand}</td>
                          <td>{medicine.price}</td>
                          <td>{medicine.manufacture_date}</td>
                          <td>{medicine.expiry_date}</td>
                          <td>{medicine.dosage}</td>
                          <td>{medicine.stock}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm mr-2"
                              onClick={() =>
                                navigate(`/seller/editmedicine/${medicine.id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(medicine.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No medicine items found.
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
