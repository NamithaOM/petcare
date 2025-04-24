import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function MedicineDetails() {
  const location = useLocation();
  const medicine = location.state?.medicine;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Handle adding the item to the cart
  const handleAddToCart = () => {
    const item = {
      itemid: medicine.id,
      items: medicine.medicine_name,
      price: medicine.price,
      quantity: 1,
      sellerId: medicine.sellerId,
      itemcategory: "medicine",
      userId: localStorage.getItem("userId"),
    };
  
    fetch(baseUrl + "add-to-cart/", {
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
  
  
  

  if (!medicine) {
    return <div>No medicine data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${baseUrl.replace(/\/$/, "")}${medicine.image}`}
              alt={medicine.medicine_name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">{medicine.medicine_name}</h2>
            <div className="table-responsive">
              <table className="table borderless">
                <tbody>
                  <tr>
                    <td className="text-start fw-bold">Brand:</td>
                    <td className="text-end">{medicine.brand}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Price:</td>
                    <td className="text-end">₹{medicine.price}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Manufacture Date:</td>
                    <td className="text-end">{medicine.manufacture_date}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Expiry Date:</td>
                    <td className="text-end">{medicine.expiry_date}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Dosage:</td>
                    <td className="text-end">{medicine.dosage}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Usage Instructions:</td>
                    <td className="text-end">{medicine.usage_instructions}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Stock:</td>
                    <td className="text-end">{medicine.count}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Recommended for:</td>
                    <td className="text-end">{medicine.pet_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Seller:</td>
                    <td className="text-end">{medicine.user_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Seller Contact:</td>
                    <td className="text-end">{medicine.user_contact}</td>
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
