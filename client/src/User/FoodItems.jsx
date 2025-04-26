import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl"; // Ensure you have this
import { useNavigate } from "react-router-dom";

export default function FoodItems() {
  const [food, setFood] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allfood/")
      .then((res) => res.json())
      .then((data) => {
        setFood(data.Food);
        setFilteredFood(data.Food); // Initially show all food items
      })
      .catch((err) => console.error("Error fetching food:", err));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter food items based on multiple fields
    const filtered = food.filter((item) => {
      return (
        item.itemname.toLowerCase().includes(query) ||
        item.pet_name.toLowerCase().includes(query) ||
        item.flavour.toLowerCase().includes(query) ||
        item.foodpreference.toLowerCase().includes(query) ||
        item.suitablefor.toLowerCase().includes(query)
      );
    });

    setFilteredFood(filtered); // Update filtered food list
  };

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

          {/* Search Input */}
          <div className="row justify-content-center pb-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search by item name, pet name, flavour, food preference, suitable for..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            {filteredFood.length > 0 ? (
              filteredFood.map((doc) => (
                <div className="col-md-4 mb-4" key={doc.id}>
                  <div className="block-7 shadow rounded">
                    <div
                      className="img rounded-top"
                      style={{
                        backgroundImage: `url(${baseUrl.replace(/\/$/, '')}${doc.image})`,
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
              ))
            ) : (
              <p>No food items found</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
