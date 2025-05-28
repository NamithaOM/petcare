import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../HomepageComponents/Header";
import "../AdminComponents/css/style.css";
import "../AdminComponents/css/bootstrap.min.css";

function MyTickets() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [tickets, setTickets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const statusClasses = {
    rejected: "text-danger",
    resolved: "text-success",
    pending: "text-warning",
    accepted: "text-primary",
  };

  useEffect(() => {
    fetch("http://localhost:4000/ticket/getalltickets")
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched data:", result);
        setTickets(result);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <>
      <Header />
      <div className="container-fluid pt-4 px-4 mt-5">
        <div className="col-sm-12 col-xl-12">
          <div className="bg-light rounded h-100 p-4">
            <h6 className="mb-4"></h6>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {/* Pending Tickets Tab */}
                <button
                  className="nav-link active fw-bold"
                  id="nav-pending-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-pending"
                  type="button"
                  role="tab"
                  aria-controls="nav-pending"
                  aria-selected="true"
                >
                  My Tickets
                </button>
              </div>
            </nav>

            <div className="tab-content pt-3" id="nav-tabContent">
              {/* Pending Tickets */}
              <div
                className="tab-pane fade show active"
                id="nav-pending"
                role="tabpanel"
                aria-labelledby="nav-pending-tab"
              >
                {/* Search Input */}
                <div className="my-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search tickets by subject, message, or status..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value.toLowerCase())
                    }
                  />
                </div>
                <div className="accordion" id="accordionPending">
                  {tickets
                    .filter((ticket) => {
                      const matchesUser =
                        ticket.userId?.toString() === auth?.regId?._id;
                      const searchFields =
                        `${ticket.subject} ${ticket.message} ${ticket.status}`.toLowerCase();
                      const matchesSearch = searchFields.includes(searchTerm);
                      return matchesUser && matchesSearch;
                    })

                    .map((ticket, index) => (
                      <div className="accordion-item" key={`pending-${index}`}>
                        <h2
                          className="accordion-header"
                          id={`headingPending${index}`}
                        >
                          <button
                            className="accordion-button collapsed ticket-header"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapsePending${index}`}
                            aria-expanded="false"
                            aria-controls={`collapsePending${index}`}
                          >
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <span
                                className="text-truncate pe-3"
                                style={{ maxWidth: "85%" }}
                              >
                                {ticket.subject || `Ticket #${index + 1}`}
                              </span>
                              <div
                                className="d-flex align-items-center"
                                style={{ minWidth: "15%" }}
                              >
                                <span className="text-nowrap">
                                  <>Status: </>
                                  <span
                                    className={`${
                                      statusClasses[ticket.status] || ""
                                    }`}
                                  >
                                    {ticket.status}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </button>
                        </h2>
                        <div
                          id={`collapsePending${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`headingPending${index}`}
                          data-bs-parent="#accordionPending"
                        >
                          <div className="accordion-body">
                            <p>
                              <strong>Message:</strong> {ticket.message}
                            </p>
                            <p>
                              <strong>Created At:</strong>{" "}
                              {new Date(ticket.createdAt).toLocaleString(
                                "en-IN",
                                {
                                  timeZone: "Asia/Kolkata",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                            {/* Accepted Ticket Details */}
                            {ticket.status === "accepted" && (
                              <>
                                <p>
                                  <strong>Accepted By:</strong>{" "}
                                  {ticket.acceptedBy?.name}
                                </p>
                                <p>
                                  <strong>Accepted At:</strong>{" "}
                                  {new Date(ticket.updatedAt).toLocaleString(
                                    "en-IN",
                                    {
                                      timeZone: "Asia/Kolkata",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </p>
                                <Link
                                  to="/supportmessages"
                                  state={{
                                    ticketId: ticket._id,
                                    customerId: auth?.regId?._id,
                                    supportId: ticket.acceptedBy?._id,
                                  }}
                                >
                                  <button className="btn btn-primary mt-2">
                                    Message Support Agent
                                  </button>
                                </Link>
                              </>
                            )}

                            {/* Resolved Ticket Details */}
                            {ticket.status === "resolved" && (
                              <>
                                <p>
                                  <strong>Resolved By:</strong>{" "}
                                  {ticket.acceptedBy?.name}
                                </p>
                                <p>
                                  <strong>Resolved At:</strong>{" "}
                                  {new Date(ticket.updatedAt).toLocaleString(
                                    "en-IN",
                                    {
                                      timeZone: "Asia/Kolkata",
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    }
                                  )}
                                </p>
                              </>
                            )}
                            <div className="mt-3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyTickets;
