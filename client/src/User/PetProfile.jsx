import React, { useEffect, useState } from "react";
import { baseUrl } from "../util/BaseUrl";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { useNavigate } from "react-router-dom";

const PetProfiles = () => {
  const [userId, setUserId] = useState(null);
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchPets = async () => {
        try {
          const response = await fetch(`${baseUrl}pet_profile/user/${userId}/`);
          if (response.ok) {
            const data = await response.json();
            setPets(data.pets);
          } else {
            console.error("Error fetching pets");
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      };
      fetchPets();
    }
  }, [userId]);

  if (!userId) return <div className="text-center mt-5">Loading...</div>;
  if (pets.length === 0)
    return <div className="text-center mt-5">No pets found for this user.</div>;

  return (
    <>
      <Header />
      <div className="container mt-5 mb-5">
        <div id="accordion" className="accordion" aria-multiselectable="true">
          {pets.length === 0 ? (
            // If no pets are found, display the "Add Details" button
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="submit"
                  value="Add Details"
                  className="btn btn-primary"
                  onClick={() => navigate("/petdetails")} // Navigate to /petdetails when clicked
                />
              </div>
            </div>
          ) : (
            pets.map((pet, index) => (
              <div className="container mt-5" key={index}>
                <h2 className="text-center mb-4 text-success">Pet Profiles</h2>

                <div className="card shadow rounded">
                  <div className="row g-0">
                    {/* Left Side: Pet Details */}
                    <div className="col-md-8 p-4">
                      <div className="card">
                        <div className="card-header p-0" id="headingFour" role="tab">
                          <h2 className="mb-0">
                            <button
                              href="#collapseFour"
                              className="d-flex py-3 px-4 align-items-center justify-content-between btn btn-link"
                              data-parent="#accordion"
                              data-toggle="collapse"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              <p className="mb-0">
                                <h5 className="mb-3 text-uppercase">
                                  {pet.name} ({pet.breed})
                                </h5>
                              </p>
                              <i className="fa" aria-hidden="true"></i>
                            </button>
                          </h2>
                        </div>
                        <div
                          className="collapse"
                          id="collapseFour"
                          role="tabpanel"
                          aria-labelledby="headingTwo"
                        >
                          <div className="card-body">
                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>Gender</strong>
                              </div>
                              <div className="col-sm-8">:&nbsp;&nbsp;{pet.gender}</div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>DoB</strong>
                              </div>
                              <div className="col-sm-8">
                                : &nbsp;&nbsp;{new Date(pet.dob).toLocaleDateString("en-GB")}
                              </div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>Age</strong>
                              </div>
                              <div className="col-sm-8">:&nbsp;&nbsp;{pet.age} years</div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>Weight</strong>
                              </div>
                              <div className="col-sm-8">:&nbsp;&nbsp;{pet.weight} kg</div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>Remarks:</strong>
                              </div>
                              <div className="col-sm-8">:&nbsp;&nbsp;{pet.remarks}</div>
                            </div>
                            <div className="row mb-2">
                              <div className="col-sm-4 text-muted">
                                <strong>Vaccines:</strong>
                              </div>
                              <div className="col-sm-8">
                                :&nbsp;&nbsp;
                                {pet.vaccines && pet.vaccines.length > 0 ? (
                                  pet.vaccines.map((vaccine, idx) => {
                                    const fileName = vaccine.file.split("/").pop(); // Extract file name
                                    return (
                                      <div key={idx} className="mb-1">
                                        <a
                                          href={`${baseUrl.replace(/\/$/, "")}${vaccine.file}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {fileName}
                                        </a>
                                      </div>
                                    );
                                  })
                                ) : (
                                  "Not provided"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Pet Image */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                      <img
                        src={`${baseUrl.replace(/\/$/, "")}${pet.image_url}`}
                        alt="Pet"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "250px", objectFit: "cover" }}
                      />
                    </div>

                    <div className="container m-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/updatepet/${pet.id}`)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PetProfiles;
