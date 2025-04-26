import React, { useEffect, useState } from "react";
import { baseUrl } from "../../util/BaseUrl";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchOrders(storedUserId); // Fetch orders for this user
    }
  }, []);

  // Fetch orders from the backend
  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`${baseUrl}view-seller-order/?sellerId=${userId}`);
      const data = await response.json(); // Ensure you parse the response as JSON
      if (data.success) {
        setOrders(data.orders); // Set orders from API
      } else {
        setMessage(data.message); // Set the error message from the backend
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage("Failed to load orders.");
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <div className="row mb-4">
                <div className="col-md-9">
                  <h3 className="text-gray-800">Customer Orders</h3>
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
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Customer Name</th>
                        <th>Customer Contact</th>
                        <th>Order Date</th>
                        <th>Payment Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) =>
                        order.items.map((item, index) => (
                          <tr key={`${order.order_id}-${index}`}>
                            <td>
                            {/* <img src={`${baseUrl}${accessory.image.startsWith("/") ? accessory.image.slice(1) : accessory.image}`} width="100" height="100" /> */}
                                
                              <img
                                src={`${baseUrl}${item.image_url.startsWith("/") ? item.image_url.slice(1) :item.image_url}`}
                                alt={item.item_name}
                                width="50"
                                height="50"
                              />
                            </td>
                            <td>{item.item_name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{order.customer_details.name}</td>
                            <td>{order.customer_details.contact}</td>
                            <td>
                              {new Date(order.order_date).toLocaleString()}
                            </td>
                            <td>{order.payment_id}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
