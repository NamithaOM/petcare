import React, { useState, useEffect } from "react";
import { baseUrl } from "../../util/BaseUrl";
import Header from "../Auth/Header";
import Sidebar from "../Auth/Sidebar";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(baseUrl + "get_order_details/"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.order_details); // Assuming 'order_details' is the key for order data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <h1 className="h3 mb-4 text-gray-800"> customer Order List</h1>
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-bordered"
                    width="100%"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th>Order Date</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Payment ID</th>
                        <th>Customer Name</th>
                        <th>Seller Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        [...orders].reverse().map((order, index) => (
                          <tr key={index}>
                            <td>
                              {new Date(order.order_date).toLocaleDateString()}
                            </td>
                            <td>{order.item_name}</td>
                            <td>{order.item_price}</td>
                            <td>{order.item_quantity}</td>
                            <td>{order.total_price}</td>
                            <td>{order.payment_id}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.seller_name}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8">No orders found</td>
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
    </>
  );
}
