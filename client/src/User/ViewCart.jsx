import React, { useEffect, useState } from "react";
import { baseUrl } from "../util/BaseUrl";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
const navigate= useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}view-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.cartItems);
        } else {
          setError(data.message || "Failed to fetch cart items.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setError("Something went wrong.");
        setLoading(false);
      });
  }, [userId]);

  const handleQuantityChange = (cartId, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
              total_price:
                type === "inc"
                  ? (item.quantity + 1) * item.price
                  : item.quantity > 1
                  ? (item.quantity - 1) * item.price
                  : item.price,
            }
          : item
      )
    );
  };

  const handleDelete = (cartId) => {
    fetch(`${baseUrl}delete-cart-item/?cartId=${cartId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(cartItems.filter((item) => item.cartId !== cartId));
        } else {
          alert(data.message || "Failed to delete item.");
        }
      })
      .catch((err) => {
        alert("Error deleting item: " + err.message);
      });
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("You must be logged in to place an order.");
      return;
    }

    const totalAmount = calculateTotal();

    const options = {
      key: "rzp_test_4Ex6Tyjkp79GFy", // Razorpay key
      amount: totalAmount * 100,
      currency: "INR",
      name: "Pet care",
      description: "Shopping Payment",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        alert("Payment Successful! Payment ID: " + paymentId);

        const orderItems = cartItems.map((item) => ({
          content_type: item.content_type, // Make sure this is present and valid
          object_id: item.itemId, // This is what was missing!
          itemcategory: item.itemcategory,
          price: item.price,
          quantity: item.quantity,
          total_price: item.total_price,
          seller_id: item.sellerId,
          item_type: item.itemType,
          payment_id: paymentId,
        }));

        fetch(baseUrl + "create-order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: storedUserId,
            items: orderItems,
            paymentId: paymentId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Order confirmed!");
              navigate("/order");
              // Optionally clear the cart or redirect to confirmation page
            } else {
              alert("Order creation failed: " + data.message);
            }
          })
          .catch((err) => {
            alert("Error creating order: " + err.message);
          });
      },
      prefill: {
        name: "Pet care",
        email: "petcare@gmail.com",
        contact: "+91 1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="table table-bordered mt-4">
              <thead>
                <tr>
                  <th></th>
                  <th>Item Name</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Total Price (₹)</th>
                  <th>Seller ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cartId}>
                    <td>
                      <img
                        src={`${baseUrl.replace(/\/$/, "")}/${item.image.replace(/^\//, "")}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt={item.itemname}
                        className="img-fluid rounded"
                      />
                    </td>
                    <td>{item.itemname}</td>
                    <td>{item.price}</td>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-outline-success d-flex align-items-center justify-content-center"
                          onClick={() => handleQuantityChange(item.cartId, "dec")}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            width: "40px",
                            textAlign: "center",
                            fontSize: "18px",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                          onClick={() => handleQuantityChange(item.cartId, "inc")}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price * item.quantity}</td>
                    <td>{item.seller_name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-dark d-flex align-items-center justify-content-center"
                        onClick={() => handleDelete(item.cartId)}
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          padding: "0",
                          fontSize: "16px",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div className="d-flex justify-content-end mt-4">
              <div
                className="card p-4"
                style={{
                  width: "300px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                }}
              >
                <h5 className="mb-3">Total Amount:₹{calculateTotal()}</h5>
                <button
                  className="btn btn-primary btn-block"
                  onClick={handlePayment}
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}  