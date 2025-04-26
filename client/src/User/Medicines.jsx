import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl"; 
import { useNavigate } from "react-router-dom";

export default function Medicines() {
  const [medicine, setMedicine] = useState([]);
  const [groupedMedicine, setGroupedMedicine] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // search state

  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allmedicine/")
      .then((res) => res.json())
      .then((data) => {
        setMedicine(data.Medicine);
        groupMedicine(data.Medicine);
      })
      .catch((err) => console.error("Error fetching medicine:", err));
  }, []);

  const groupMedicine = (medicineList) => {
    const grouped = {};
    medicineList.forEach((med) => {
      const petName = med.pet_name || "Unknown";
      if (!grouped[petName]) {
        grouped[petName] = [];
      }
      grouped[petName].push(med);
    });
    setGroupedMedicine(grouped);
  };

  const handleViewDetails = (medicine) => {
    navigate(`/medicine-details/${medicine.id}`, { state: { medicine } });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = medicine.filter((med) => 
      med.pet_name.toLowerCase().includes(value.toLowerCase()) ||
      med.brand.toLowerCase().includes(value.toLowerCase()) ||
      med.medicine_name.toLowerCase().includes(value.toLowerCase())
    );

    groupMedicine(filtered);
  };

  return (
    <>
      <Header />
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-3 mb-3">
            <div className="col-md-8 text-center">
              <h2>Medicines</h2>
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Search by Pet Name, Brand, or Medicine Name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {Object.entries(groupedMedicine).length === 0 ? (
            <div className="text-center">No medicines found.</div>
          ) : (
            Object.entries(groupedMedicine).map(([petName, medicines]) => (
              <div key={petName}>
                <h3 className="text-center my-4">{petName}'s Medicines</h3>
                <div className="row">
                  {medicines.map((doc) => (
                    <div className="col-md-4 mb-4" key={doc.id}>
                      <div className="block-7 shadow rounded">
                        <div
                          className="img rounded-top"
                          style={{
                            backgroundImage: `url(${baseUrl.replace(/\/$/, "")}${doc.image})`,
                            height: "250px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                          }}
                        ></div>
                        <div className="text-center p-4">
                          <span className="excerpt d-block">
                            {doc.medicine_name}
                          </span>
                          <button
                            className="btn btn-primary d-block px-4 py-2 mt-3"
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
            ))
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
