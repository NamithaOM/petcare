import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl"; // Ensure you have this
import { useNavigate } from "react-router-dom";

export default function Medicines() {
  const [medicine, setmedicine] = useState([]);
  const [groupedMedicine, setGroupedMedicine] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allmedicine/")
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        console.log(data);

        data.Medicine.forEach((med) => {
          const petName = med.pet_name || "Unknown";
          if (!grouped[petName]) {
            grouped[petName] = [];
          }
          grouped[petName].push(med);
        });

        setGroupedMedicine(grouped);
      })
      .catch((err) => console.error("Error fetching medicine:", err));
  }, []);

  const handleViewDetails = (medicine) => {
    navigate(`/medicine-details/${medicine.id}`, { state: { medicine } });
  };

  return (
    <>
      <Header />
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2> Medicines</h2>
            </div>
          </div>
          {Object.entries(groupedMedicine).map(([petName, medicines]) => (
            <div key={petName}>
              <h3 className="text-center my-4">{petName}'s Medicines</h3>
              <div className="row">
                {medicines.map((doc) => (
                  <div className="col-md-4 mb-4" key={doc.id}>
                    <div className="block-7 shadow rounded">
                      <div
                        className="img rounded-top"
                        style={{
                          backgroundImage: `url(${baseUrl.replace(/\/$/, "")}${
                            doc.image
                          })`,
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
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
