import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function ViewAccessories() {
    const [accessories, setAccessories] = useState([]);
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
            fetchAccessories(userId);
        }
    }, [userId]);

    const fetchAccessories = async (userId) => {
        try {
            const response = await fetch(`${baseUrl}view_accessories/${userId}/`);
            const data = await response.json();
            if (response.ok) {
                setAccessories(data.accessories);
            } else {
                setMessage(data.error || "Failed to load accessories");
            }
        } catch (error) {
            setMessage("Error fetching accessories.");
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;
        const response = await fetch(baseUrl + `delete_accessory/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.success) {
            alert("Deleted successfully!");
            fetchAccessories(userId);
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
                                <h3 className="text-gray-800">My Accessories</h3>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-success" onClick={() => navigate('/seller/addaccessory')}>Add Accessory</button>
                            </div>
                        </div>
                        {message && <div className="alert alert-danger">{message}</div>}
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Accessory Name</th>
                                            <th>Brand</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accessories.length > 0 ? (
                                            accessories.map((accessory) => (
                                                <tr key={accessory.id}>
                                                    <td>
                                                        <img src={`${baseUrl}${accessory.image.startsWith("/") ? accessory.image.slice(1) : accessory.image}`} width="100" height="100" />
                                                    </td>
                                                    <td>{accessory.accessory_name}</td>
                                                    <td>{accessory.brand}</td>
                                                    <td>{accessory.price}</td>
                                                    <td>{accessory.stock}</td>
                                                    <td>{accessory.description}</td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm mr-2" onClick={() => navigate(`/seller/editaccessory/${accessory.id}`)}>Edit</button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(accessory.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">No accessories found.</td>
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