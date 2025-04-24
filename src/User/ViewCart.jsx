import React, { useEffect, useState } from "react";
import { baseUrl } from "../util/BaseUrl";

export default function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`${baseUrl}view-cart/?userId=${userId}`)
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
      name: "Your Shop Name",
      description: "Shopping Cart Payment",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        alert("Payment Successful! Payment ID: " + paymentId);

        const orderItems = cartItems.map((item) => ({
          content_type: item.content_type,
          object_id: item.cartId,
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
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Order confirmed!");
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
        name: "Your Name",
        email: "youremail@example.com",
        contact: "1234567890",
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
    <div className="container py-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
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
                  <td>{item.itemname}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary me-1"
                      onClick={() => handleQuantityChange(item.cartId, "dec")}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-sm btn-secondary ms-1"
                      onClick={() => handleQuantityChange(item.cartId, "inc")}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>{item.sellerId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.cartId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>Total: ₹{calculateTotal()}</h5>
          <button className="btn btn-primary mt-3" onClick={handlePayment}>
            Buy Now
          </button>
        </>
      )}
    </div>
  );
}
