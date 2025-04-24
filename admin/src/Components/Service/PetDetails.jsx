import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";

export default function PetDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const pets = location.state?.petInfo || [];
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success">Pet Profiles</h2>
      {pets.length === 0 ? (
        <p>No pet information available.</p>
      ) : (
        pets.map((pet, index) => (
          <div className="container mt-5" key={index}>
            <div className="card shadow rounded">
              <div className="row g-0">
                {/* Left Side: Pet Details */}
                <div className="col-md-7 p-4">
                  <div className="card">
                    <div
                      className="card-header p-0"
                      id="headingFour"
                      role="tab"
                    >
                      <h5 className="m-3 text-uppercase">
                        {pet.name} ({pet.breed})
                      </h5>
                    </div>

                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col-sm-4 text-muted">
                          <strong>Gender</strong>
                        </div>
                        <div className="col-sm-8">
                          :&nbsp;&nbsp;{pet.gender}
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-sm-4 text-muted">
                          <strong>DoB</strong>
                        </div>
                        <div className="col-sm-8">
                          : &nbsp;&nbsp;
                          {new Date(pet.dob).toLocaleDateString("en-GB")}
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-sm-4 text-muted">
                          <strong>Age</strong>
                        </div>
                        <div className="col-sm-8">
                          :&nbsp;&nbsp;{pet.age} years
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-sm-4 text-muted">
                          <strong>Weight</strong>
                        </div>
                        <div className="col-sm-8">
                          :&nbsp;&nbsp;{pet.weight} kg
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-sm-4 text-muted">
                          <strong>Remarks:</strong>
                        </div>
                        <div className="col-sm-8">
                          :&nbsp;&nbsp;{pet.remarks}
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>

                {/* Right Side: Pet Image */}
                <div className="col-md-4 d-flex align-items-stretch flex-column">
                  <div className="info-wrap p-5 img mb-2">
                    <img
                      src={`${baseUrl.replace(/\/$/, "")}${pet.image_url}`}
                      alt="Pet"
                      className="img-fluid rounded shadow"
                      style={{ maxHeight: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="info-wrap mb-2 pl-5">
                    <h3>Vaccine Details</h3>
                    {pet.vaccines && pet.vaccines.length > 0 ? (
                      <ul>
                        {pet.vaccines.map((vaccine, idx) => (
                          <li key={idx}>
                            <a
                              href={`${baseUrl.replace(/\/$/, "")}${
                                vaccine.file
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {vaccine.file.split("/").pop()}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Not provided</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
