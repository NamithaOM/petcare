import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminNavbar from "../AdminComponents/AdminNavbar";
import "../AdminComponents/css/style.css";
import "../AdminComponents/css/bootstrap.min.css";

function CustomerServiceEnquiries() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  const [enquiries, setEnquiries] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/contact/getallcontact")
      .then((response) => response.json())
      .then((result) => {
        console.log("Fetched data:", result);
        setEnquiries(result);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleAccept = async (contactId) => {
    try {
      await fetch("http://localhost:4000/contact/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          userId: auth?.regId?._id,
        }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Accept failed", err);
    }
  };

  const handleResolve = async (contactId) => {
    try {
      await fetch("http://localhost:4000/contact/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Resolve failed", err);
    }
  };

  const handleReject = async (contactId) => {
    try {
      await fetch("http://localhost:4000/contact/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      });
      setRefresh((prev) => prev + 1);
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleReturnToPending = async (contactId) => {
    try {
      await fetch("http://localhost:4000/contact/returntopending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
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
              <h6 className="mb-4">Public Enquiries</h6>
              {/* Search Bar */}
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "50px", fontSize: "16px" }}
                  placeholder="Search enquiries by subject, name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>

              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-pending-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-pending"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Pending Enquiries
                  </button>
                  <button
                    className="nav-link"
                    id="nav-accepted-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-accepted"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Accepted Enquiries
                  </button>
                  <button
                    className="nav-link"
                    id="nav-resolved-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-resolved"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Resolved Enquiries
                  </button>
                  <button
                    className="nav-link"
                    id="nav-rejected-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-rejected"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Rejected Enquiries
                  </button>
                </div>
              </nav>

              <div className="tab-content pt-3" id="nav-tabContent">
                {/* Public Enquiries */}
                <div
                  className="tab-pane fade show active"
                  id="nav-pending"
                  role="tabpanel"
                  aria-labelledby="nav-pending-tab"
                >
                  <div className="accordion" id="accordionPublic">
                    {enquiries
                      .filter(
                        (enquiry) =>
                          enquiry.status === "pending" &&
                          `${enquiry.subject} ${enquiry.name} ${enquiry.email} ${enquiry.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((enquiry, index) => (
                        <div className="accordion-item" key={`public-${index}`}>
                          <h2
                            className="accordion-header"
                            id={`headingPublic${index}`}
                          >
                            <button
                              className="accordion-button collapsed enquiry-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapsePublic${index}`}
                              aria-expanded="false"
                              aria-controls={`collapsePublic${index}`}
                            >
                              {enquiry.subject ||
                                `Pending Enquiry #${index + 1}`}
                            </button>
                          </h2>
                          <div
                            id={`collapsePublic${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`headingPublic${index}`}
                            data-bs-parent="#accordionPublic"
                          >
                            <div className="accordion-body">
                              <p>
                                <strong>Name:</strong> {enquiry.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {enquiry.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {enquiry.message}
                              </p>
                              <div className="mt-3">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleAccept(enquiry._id)}
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

                {/* Accepted Enquiries */}
                <div
                  className="tab-pane fade"
                  id="nav-accepted"
                  role="tabpanel"
                  aria-labelledby="nav-accepted-tab"
                >
                  <div className="accordion" id="accordionAccepted">
                    {enquiries
                      .filter(
                        (enquiry) =>
                          enquiry.status === "accepted" &&
                          enquiry.acceptedBy === auth?.regId?._id &&
                          `${enquiry.subject} ${enquiry.name} ${enquiry.email} ${enquiry.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((enquiry, index) => (
                        <div
                          className="accordion-item"
                          key={`accepted-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingAccepted${index}`}
                          >
                            <button
                              className="accordion-button collapsed enquiry-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseAccepted${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseAccepted${index}`}
                            >
                              {enquiry.subject ||
                                `Accepted Enquiry #${index + 1}`}
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
                                <strong>Name:</strong> {enquiry.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {enquiry.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {enquiry.message}
                              </p>
                              <div className="mt-3">
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleResolve(enquiry._id)}
                                >
                                  Mark as Resolved
                                </button>
                                &nbsp;&nbsp;
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleReject(enquiry._id)}
                                >
                                  Rejected
                                </button>
                                &nbsp;&nbsp;
                                <button
                                  className="btn btn-warning"
                                  onClick={() =>
                                    handleReturnToPending(enquiry._id)
                                  }
                                >
                                  Return to Pending
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Resolved Enquiries */}
                <div
                  className="tab-pane fade"
                  id="nav-resolved"
                  role="tabpanel"
                  aria-labelledby="nav-resolved-tab"
                >
                  <div className="accordion" id="accordionResolved">
                    {enquiries
                      .filter(
                        (enquiry) =>
                          enquiry.status === "resolved" &&
                          enquiry.acceptedBy === auth?.regId?._id &&
                          `${enquiry.subject} ${enquiry.name} ${enquiry.email} ${enquiry.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((enquiry, index) => (
                        <div
                          className="accordion-item"
                          key={`resolved-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingResolved${index}`}
                          >
                            <button
                              className="accordion-button collapsed enquiry-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseResolved${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseResolved${index}`}
                            >
                              {enquiry.subject ||
                                `Resolved Enquiry #${index + 1}`}
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
                                <strong>Name:</strong> {enquiry.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {enquiry.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {enquiry.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Rejected Enquiries */}
                <div
                  className="tab-pane fade"
                  id="nav-rejected"
                  role="tabpanel"
                  aria-labelledby="nav-rejected-tab"
                >
                  <div className="accordion" id="accordionRejected">
                    {enquiries
                      .filter(
                        (enquiry) =>
                          enquiry.status === "rejected" &&
                          enquiry.acceptedBy === auth?.regId?._id &&
                          `${enquiry.subject} ${enquiry.name} ${enquiry.email} ${enquiry.message}`
                            .toLowerCase()
                            .includes(searchTerm)
                      )
                      .map((enquiry, index) => (
                        <div
                          className="accordion-item"
                          key={`rejected-${index}`}
                        >
                          <h2
                            className="accordion-header"
                            id={`headingRejected${index}`}
                          >
                            <button
                              className="accordion-button collapsed enquiry-header"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseRejected${index}`}
                              aria-expanded="false"
                              aria-controls={`collapseRejected${index}`}
                            >
                              {enquiry.subject ||
                                `Rejected Enquiry #${index + 1}`}
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
                                <strong>Name:</strong> {enquiry.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {enquiry.email}
                              </p>
                              <p>
                                <strong>Message:</strong> {enquiry.message}
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

export default CustomerServiceEnquiries;
