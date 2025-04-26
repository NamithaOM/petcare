import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function FoodDetails() {
  const location = useLocation();
  const food = location.state?.food;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const item = {
        itemid: food.id,
        items: food.food_name,
        price: food.price,
        quantity: 1,
        sellerId: food.sellerId,
        itemcategory: "food",
        userId: localStorage.getItem("userId"),
    };
  
    fetch(`${baseUrl}add-to-cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Added to cart successfully!");
          navigate("/cart");
        } else {
          alert("Failed to add to cart: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred while adding to cart.");
      });
  };
  
  

  if (!food) {
    return <div>No food data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 mt-5">
            <img
              src={`${baseUrl.replace(/\/$/, "")}${food.image}`}
              alt={food.food_name}
              width= "100%"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">{food.itemname}</h2>
            <div className="table-responsive">
              <table className="table borderless">
                <tbody>
                  <tr>
                    <td className="text-start fw-bold">Quantity:</td>
                    <td className="text-end">{food.quantity} KG / L </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Price:</td>
                    <td className="text-end">₹{food.price}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Manufacture Date:</td>
                    <td className="text-end">{food.dom}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Expiry Date:</td>
                    <td className="text-end">{food.doe}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Suitable for:</td>
                    <td className="text-end">{food.suitablefor}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Food preference:</td>
                    <td className="text-end">{food.foodpreference}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Flavour:</td>
                    <td className="text-end">{food.flavour}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Stock:</td>
                    <td className="text-end">{food.count}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Recommended for:</td>
                    <td className="text-end">{food.pet_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Seller:</td>
                    <td className="text-end">{food.user_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Seller Contact:</td>
                    <td className="text-end">{food.user_contact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center p-4">
            <button
              className="btn btn-warning d-block px-4 py-2"
              onClick={handleAddToCart}  // Call the handle function on button click
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
