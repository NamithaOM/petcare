import React, { useState, useEffect } from "react";
import { baseUrl } from "../util/BaseUrl"; // Assuming this is where the base URL is stored
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";

export default function Order() {
  const [orderitems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}view-order/?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Flatten the items array from all orders into a single array
          const allItems = data.orders.flatMap((order) => {
            return order.items.map((item) => ({
              ...item,
              order_date: order.order_date, // Add the order_date to each item
              payment_id: order.payment_id, // Add the payment_id to each item
            }));
          });
          setOrderItems(allItems); // Set the flattened array of items
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Something went wrong.");
        setLoading(false);
      });
  }, [userId]);

  const formatDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // If parsing fails, return a fallback message
    }
    return new Date(parsedDate).toLocaleString(); // Return formatted date
  };

 
  return (
    <>
     <Header/>
    <div className="container py-5">
      <h2>Your Orders</h2>
      {error && <p className="text-danger">{error}</p>}
      {orderitems.length === 0 ? (
        <p>Your order is empty.</p>
      ) : (
        <>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price (₹)</th>
                <th>Quantity</th>
                <th>Total Price (₹)</th>
                <th>Category</th>
                <th>Order Date</th>
                <th>Payment ID</th>
                <th>Delivery status</th>
              </tr>
            </thead>
            <tbody>
              {orderitems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`${baseUrl.replace(/\/$/, "")}${item.image_url}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      alt={item.item_name}
                      className="img-fluid rounded"
                    />
                  </td>
                  <td>{item.item_name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.total_price}</td>
                  <td>{item.category}</td>
                  <td>{formatDate(item.order_date)}</td> {/* Format the order date */}
                  <td>{item.payment_id}</td> {/* Display Payment ID */}
                  <td>{item.deliverystatus}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
}
