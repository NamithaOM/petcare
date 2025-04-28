import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";
import { baseUrl } from "../../util/BaseUrl";

export default function SellerDashboard() {
    const [accessories, setAccessories] = useState([]);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);
    const [foods, setFoods] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false); // Track loading state
  
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
        setLoading(true); // Start loading when fetching data
        fetchFoodItems(userId);
        fetchAccessories(userId);
        fetchMedicineItems(userId);
        fetchOrders(userId);
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
  
    const fetchOrders = async (userId) => {
      try {
        const response = await fetch(`${baseUrl}view-seller-order/?sellerId=${userId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage("Error fetching orders.");
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };
  
    if (loading) {
      return <div>Loading...</div>; // Show a loading message or spinner
    }
  
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total food items
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {foods.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Total medicines
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {medicines.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Total accessories
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {accessories.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Total Customers
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {orders.length}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  