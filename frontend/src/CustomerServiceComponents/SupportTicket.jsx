import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import "../AdminComponents/css/style.css";
import "../AdminComponents/css/bootstrap.min.css";

function SupportTicket() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  const [tickets, setTickets] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/ticket/getalltickets")
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched data:", result);
        setTickets(result);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleAccept = async (ticketId) => {
    try {
      await fetch("http://localhost:4000/ticket/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          userId: auth?.regId?._id,
        }),
      });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Ticket acceptance failed", err);
    }
  };

  const handleResolve = async (ticketId) => {
    try {
      await fetch("http://localhost:4000/ticket/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Resolve failed", err);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      await fetch("http://localhost:4000/ticket/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleReturnToPending = async (ticketId) => {
    try {
      await fetch("http://localhost:4000/ticket/returntopending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId,
          userId: auth?.regId?._id,
        }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Return to pending failed", err);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminNavbar />
        <div className="container-fluid pt-4 px-4">
          <div className="col-sm-12 col-xl-12">
            <div className="bg-light rounded h-100 p-4">
              <h6 className="mb-4">Support Tickets</h6>
              {/* Search Bar */}
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "50px", fontSize: "16px" }}
                  placeholder="Search by subject, name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {/* Pending Tickets Tab */}
                  <button
                    className="nav-link active"
                    id="nav-pending-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-pending"
                    type="button"
                    role="tab"
                    aria-controls="nav-pending"
                    aria-selected="true"
                  >
                    Pending Tickets
                  </button>
                  {/* Accepted Tickets Tab */}
                  <button
                    className="nav-link"
                    id="nav-accepted-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-accepted"
                    type="button"
                    role="tab"
                    aria-controls="nav-accepted"
                    aria-selected="false"
                  >
                    Accepted Tickets
                  </button>
                  {/* Resolved Tickets Tab */}
                  <button
                    className="nav-link"
                    id="nav-resolved-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-resolved"
                    type="button"
                    role="tab"
                    aria-controls="nav-resolved"
                    aria-selected="false"
                  >
                    Resolved Tickets
                  </button>
                  {/* Rejected Tickets Tab */}
                  <button
                    className="nav-link"
                    id="nav-rejected-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-rejected"
                    type="button"
                    role="tab"
                    aria-controls="nav-rejected"
                    aria-selected="false"
                  >
                    Rejected Tickets
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
                  <div className="accordion" id="accordionPending">
                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.status === "pending" &&
                          `${ticket.subject} ${ticket.name} ${ticket.email} ${ticket.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((ticket, index) => (
                        <div
                          className="accordion-item"
                          key={`pending-${index}`}
                        >
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
                              {ticket.subject || `Pending Ticket #${index + 1}`}
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
                                <strong>Name:</strong> {ticket.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {ticket.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {ticket.message}
                              </p>
                              <div className="mt-3">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleAccept(ticket._id)}
                                >
                                  Accept
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Accepted Tickets */}
                <div
                  className="tab-pane fade"
                  id="nav-accepted"
                  role="tabpanel"
                  aria-labelledby="nav-accepted-tab"
                >
                  <div className="accordion" id="accordionAccepted">
                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.status === "accepted" &&
                          ticket.acceptedBy._id === auth?.regId?._id &&
                          `${ticket.subject} ${ticket.name} ${ticket.email} ${ticket.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((ticket, index) => (
                        <div
                          className="accordion-item"
                          key={`accepted-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingAccepted${index}`}
                          >
                            <button
                              className="accordion-button collapsed ticket-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseAccepted${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseAccepted${index}`}
                            >
                              {ticket.subject ||
                                `Accepted Ticket #${index + 1}`}
                            </button>
                          </h2>
                          <div
                            id={`collapseAccepted${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`headingAccepted${index}`}
                            data-bs-parent="#accordionAccepted"
                          >
                            <div className="accordion-body">
                              <p>
                                <strong>Name:</strong> {ticket.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {ticket.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {ticket.message}
                              </p>
                              <div className="mt-3 d-flex flex-wrap gap-2 align-items-center">
                                <div className="d-flex flex-wrap gap-2">
                                  <button
                                    className="btn btn-success"
                                    onClick={() => handleResolve(ticket._id)}
                                  >
                                    Mark as Resolved
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleReject(ticket._id)}
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                      handleReturnToPending(ticket._id)
                                    }
                                  >
                                    Return to Pending
                                  </button>
                                </div>
                                <Link
                                  to="/customermessages"
                                  className="ms-auto"
                                  state={{
                                    ticketId: ticket._id,
                                    customerId: auth?.regId?._id,
                                    supportId: ticket.acceptedBy?._id,
                                  }}
                                >
                                  <button className="btn btn-primary">
                                    Message Customer
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Resolved Tickets */}
                <div
                  className="tab-pane fade"
                  id="nav-resolved"
                  role="tabpanel"
                  aria-labelledby="nav-resolved-tab"
                >
                  <div className="accordion" id="accordionResolved">
                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.status === "resolved" &&
                          ticket.acceptedBy._id === auth?.regId?._id &&
                          `${ticket.subject} ${ticket.name} ${ticket.email} ${ticket.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((ticket, index) => (
                        <div
                          className="accordion-item"
                          key={`resolved-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingResolved${index}`}
                          >
                            <button
                              className="accordion-button collapsed ticket-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseResolved${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseResolved${index}`}
                            >
                              {ticket.subject ||
                                `Resolved Ticket #${index + 1}`}
                            </button>
                          </h2>
                          <div
                            id={`collapseResolved${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`headingResolved${index}`}
                            data-bs-parent="#accordionResolved"
                          >
                            <div className="accordion-body">
                              <p>
                                <strong>Name:</strong> {ticket.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {ticket.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {ticket.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Rejected Tickets */}
                <div
                  className="tab-pane fade"
                  id="nav-rejected"
                  role="tabpanel"
                  aria-labelledby="nav-rejected-tab"
                >
                  <div className="accordion" id="accordionRejected">
                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.status === "rejected" &&
                          ticket.acceptedBy._id === auth?.regId?._id &&
                          `${ticket.subject} ${ticket.name} ${ticket.email} ${ticket.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((ticket, index) => (
                        <div
                          className="accordion-item"
                          key={`rejected-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingRejected${index}`}
                          >
                            <button
                              className="accordion-button collapsed ticket-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseRejected${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseRejected${index}`}
                            >
                              {ticket.subject ||
                                `Rejected Ticket #${index + 1}`}
                            </button>
                          </h2>
                          <div
                            id={`collapseRejected${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`headingRejected${index}`}
                            data-bs-parent="#accordionRejected"
                          >
                            <div className="accordion-body">
                              <p>
                                <strong>Name:</strong> {ticket.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {ticket.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {ticket.message}
                              </p>
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
      </div>
    </>
  );
}

export default SupportTicket;
