import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function AccessoryDetails() {
  const location = useLocation();
  const accessory = location.state?.accessories;
  if (!accessory) {
    return <div>No accessory data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${baseUrl.replace(/\/$/, "")}${accessory.image}`}
              alt={accessory.accessory_name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">{accessory.accessory_name}</h2>
            <div className="table-responsive">
              <table className="table borderless">
                <tbody>
                  <tr>
                    <td className="text-start fw-bold">Brand:</td>
                    <td className="text-end">{accessory.brand}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Price:</td>
                    <td className="text-end">₹{accessory.price}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Stock:</td>
                    <td className="text-end">{accessory.stock}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Recommended for:</td>
                    <td className="text-end">{accessory.pet_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Description:</td>
                    <td className="text-end">{accessory.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center p-4">
            <button className="btn btn-warning d-block px-4 py-2">
              Add to cart
            </button>
          </div>

          <div className="text-center p-4">
            <button className="btn btn-info d-block px-4 py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
