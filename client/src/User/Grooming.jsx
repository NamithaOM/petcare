import React, { useEffect, useState } from "react";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl"; // Ensure you have this
import { useNavigate } from "react-router-dom";

export default function Grooming() {
  const [grooming, setGrooming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "allTgrooming/")
      .then((res) => res.json())
      .then((data) => setGrooming(data.Groomings))
      .catch((err) => console.error("Error fetching traineers:", err));
  }, []);

  const handleViewDetails = (grooming) => {
    navigate(`/grooming-details/${grooming.id}`, { state: { grooming } });
  };

  return (
    <>
      <Header />
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2>Our Special Treatements</h2>
            </div>
          </div>
          <div className="row">
            {grooming.map((doc) => (
              <div className="col-md-4 mb-4" key={doc.id}>
                <div className="block-7 shadow rounded">
                  <div
                    className="img rounded-top"
                    style={{
                      backgroundImage: `url(${baseUrl.replace(/\/$/, '')}/${doc.photo.replace(/^\//, '')})`,
                      height: "250px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                  <div className="text-center p-4">
                    <span className="excerpt d-block">{doc.name}</span>
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
