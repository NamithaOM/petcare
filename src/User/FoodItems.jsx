import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl"; // Ensure you have this
import { useNavigate } from "react-router-dom";

export default function FoodItems() {
  const [food, setFood] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allfood/")
      .then((res) => res.json())
      .then((data) => setFood(data.Food))
      .catch((err) => console.error("Error fetching food:", err));
  }, []);

  const handleViewDetails = (food) => {
    navigate(`/food-Details/${food.id}`, { state: { food } });
  };

  return (
    <>
      <Header />
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2>Food for your loved Ones</h2>
            </div>
          </div>
          <div className="row">
            {food.map((doc) => (
              <div className="col-md-4 mb-4" key={doc.id}>
                <div className="block-7 shadow rounded">
                  <div
                    className="img rounded-top"
                    style={{
                      backgroundImage: `url(${baseUrl}media/${doc.image})`,
                      height: "250px",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                  <div className="text-center p-4">
                    <span className="excerpt d-block">{doc.itemname}</span>
                    <button
                      className="btn btn-primary d-block px-4 py-2"
                      onClick={() => handleViewDetails(doc)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
