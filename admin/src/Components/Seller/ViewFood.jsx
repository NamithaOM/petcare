import React, { useEffect, useState } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { baseUrl } from "../../util/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function ViewFood() {
  const [foods, setFoods] = useState([]);
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
      fetchFoodItems(userId);
    }
  }, [userId]);

  const fetchFoodItems = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}view_food/${userId}/`);
      const data = await response.json();
      if (response.ok) {
        setFoods(data.foods);
      } else {
        setMessage(data.error || "Failed to load food items");
      }
    } catch (error) {
      setMessage("Error fetching food items.");
    }
  };


  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const response = await fetch(baseUrl + `deletefood/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();
    if (data.success) {
      alert("Deleted successfully!");
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
        <h3 className="text-gray-800">My Food Items</h3>
    </div>
    <div className="col-md-3">
        <button className="btn btn-success" onClick={() => navigate('/seller/addfood')}>Add Food</button>
    </div>
</div>
            {message && <div className="alert alert-danger">{message}</div>}

            <div className="row">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Item Name</th>
                      <th>Quantity (Kg)</th>
                      <th>Price</th>
                      <th>Manufactured Date</th>
                      <th>Expiry Date</th>
                      <th>Suitable For</th>
                      <th>Food Preference</th>
                      <th>Flavour</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.length > 0 ? (
                      foods.map((food) => (
                        <tr key={food.id}>
                          <td>
                            <img
                              src={`${baseUrl}${
                                food.image.startsWith("/")
                                  ? food.image.slice(1)
                                  : food.image
                              }`}
                              width="100"
                              height="100"
                            />
                          </td>
                          <td>{food.itemname}</td>
                          <td>{food.quantity}</td>
                          <td>{food.price}</td>
                          <td>{food.dom}</td>
                          <td>{food.doe}</td>
                          <td>{food.suitablefor}</td>
                          <td>{food.foodpreference}</td>
                          <td>{food.flavour}</td>
                          <td>{food.count}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm mr-2"
                              onClick={() =>
                                navigate(`/seller/editfood/${food.id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(food.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No food items found.
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
