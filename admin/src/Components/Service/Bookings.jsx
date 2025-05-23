import React, { useState, useEffect } from "react";
import Sidebar from "../Auth/Sidebar";
import Header from "../Auth/Header";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../util/BaseUrl";
import { Button, Modal } from "react-bootstrap";

export default function Bookings() {
  const [formData, setFormData] = useState({ userid: "" });
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBookingType, setSelectedBookingType] = useState("");

  const handlePetDetails = (booking) => {
    navigate("/service/petdetails", { state: { petInfo: booking.pets } });
  };

 

function handleCancel(bookingId, bookingType) {
  setSelectedBookingId(bookingId);
  setSelectedBookingType(bookingType);
  setShowModal(true);
}

async function submitCancellation() {
  if (!cancelReason.trim()) {
    alert("Cancellation reason is required.");
    return;
  }

  await cancelBooking(selectedBookingId, cancelReason, selectedBookingType);
  setShowModal(false);
  setCancelReason("");
}


  async function cancelBooking(bookingId, reason, bookingType) {
     let url = '';
console.log(url);

    if (bookingType === "grooming") {
      url = `${baseUrl}`+"cancel_grooming_booking/";
    } else if (bookingType === "doctor") {
      url = `${baseUrl}`+"cancel_doctor_booking/";
    } else if (bookingType === "trainer") {
      url = `${baseUrl}`+"cancel_trainer_booking/";
    } else {
      alert("Invalid booking type");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          reason: reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // or show success toast
        // Optionally, refresh the list
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Error cancelling booking");
    }
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userid: storedUserId }));
    }
  }, []);

  const fetchTrainerBookings = async () => {
    try {
      const response = await fetch(
        `${baseUrl}get_trainer_bookings_by_service_center`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: formData.userid }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data.bookings || []);
      setActiveTab("Trainers");
    } catch (error) {
      console.error("Error fetching trainer bookings:", error);
    }
  };

  const fetchDoctorBookings = async () => {
    try {
      const response = await fetch(
        `${baseUrl}get_doctor_bookings_by_service_center`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: formData.userid }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data.bookings || []);
      setActiveTab("Doctors");
    } catch (error) {
      console.error("Error fetching trainer bookings:", error);
    }
  };

  const fetchGroomingBookings = async () => {
    try {
      const response = await fetch(
        `${baseUrl}get_grooming_bookings_by_service_center`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: formData.userid }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data.bookings || []);
      setActiveTab("Grooming");
    } catch (error) {
      console.error("Error fetching Grooming bookings:", error);
    }
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">
              <h1 className="h3 mb-4 text-gray-800">Booking History</h1>

              <div
                style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
              >
                <div
                  style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
                >
                  <div
                    onClick={fetchDoctorBookings}
                    style={{
                      cursor: "pointer",
                      border:
                        activeTab === "Doctors"
                          ? "2px solid #007bff"
                          : "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "300px",
                      textAlign: "center",
                      backgroundColor:
                        activeTab === "Doctors" ? "#e7f1ff" : "#fff",
                      boxShadow:
                        activeTab === "Doctors"
                          ? "0px 4px 10px rgba(0, 123, 255, 0.2)"
                          : "none",
                    }}
                  >
                    <img
                      src={require("../../assets/img/pic/doctor.jpg")}
                      alt="Doctors"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <strong>Doctors</strong>
                  </div>

                  <div
                    onClick={fetchGroomingBookings}
                    style={{
                      cursor: "pointer",
                      border:
                        activeTab === "Grooming"
                          ? "2px solid #ffc107"
                          : "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "300px",
                      textAlign: "center",
                      backgroundColor:
                        activeTab === "Grooming" ? "#e7f1ff" : "#fff",
                      boxShadow:
                        activeTab === "Grooming"
                          ? "0px 4px 10px  rgba(255, 193, 7, 0.2)"
                          : "none",
                    }}
                  >
                    <img
                      src={require("../../assets/img/pic/grooming.jpg")}
                      alt="Grooming"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <strong>Grooming</strong>
                  </div>

                  <div
                    onClick={fetchTrainerBookings}
                    style={{
                      cursor: "pointer",
                      border:
                        activeTab === "Trainers"
                          ? "2px solid #28a745"
                          : "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "10px",
                      width: "300px",
                      textAlign: "center",
                      backgroundColor:
                        activeTab === "Trainers" ? "#e7f1ff" : "#fff",
                      boxShadow:
                        activeTab === "Trainers"
                          ? "0px 4px 10px  rgba(40, 167, 69, 0.2)"
                          : "none",
                    }}
                  >
                    <img
                      src={require("../../assets/img/pic/trainer.jpg")}
                      alt="Trainers"
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <strong>Trainers</strong>
                  </div>
                </div>
              </div>

              {activeTab === "Trainers" && bookings.length > 0 && (
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead className="dg-secondary">
                    <tr style={{ backgroundColor: "#CAE0BC" }}>
                      <th>Trainer Name</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Session</th>
                      <th>Fees</th>
                      <th>Payment ID</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.booking_id}>
                        <td>{booking.trainer_name}</td>
                        <td>{booking.customer_name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.session}</td>
                        <td>{booking.fees}</td>
                        <td>{booking.paymentId}</td>
                        <td>{booking.customer_contact}</td>

                        <td>
                          {booking.status === "1"
                            ? "Confirmed"
                            : booking.status === "2"
                            ? "Cancelled"
                            : "Pending"}
                        </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePetDetails(booking)}
                          >
                            Pet Details
                          </button>
                        </td>
                        <td>
                          {booking.status !== "2" && (
                            <button className="btn btn-danger "
                            onClick={() => handleCancel(booking.booking_id, "trainer")}

                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "Doctors" && bookings.length > 0 && (
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr style={{ background: "#9EC6F3" }}>
                      <th>Doctor Name</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Session</th>
                      <th>Fees</th>
                      <th>Payment ID</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.booking_id}>
                        <td>{booking.doctor_name}</td>
                        <td>{booking.customer_name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.session}</td>
                        <td>{booking.fees}</td>
                        <td>{booking.paymentId}</td>
                        <td>{booking.customer_contact}</td>
                        <td>
                          {booking.status === "1"
                            ? "Confirmed"
                            : booking.status === "2"
                            ? "Cancelled"
                            : "Pending"}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePetDetails(booking)}
                          >
                            Pet Details
                          </button>
                        </td>
                        <td>
                          {booking.status !== "2" && (
                            <button className="btn btn-danger"
                            onClick={() => handleCancel(booking.booking_id, "doctor")}

                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "Grooming" && bookings.length > 0 && (
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr style={{ background: "#FFFECE" }}>
                      <th>Grooming</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Session</th>
                      <th>Fees</th>
                      <th>Payment ID</th>
                      <th>Contact</th>
                      <th></th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.booking_id}>
                        <td>{booking.grooming_name}</td>
                        <td>{booking.customer_name}</td>
                        <td>{booking.date}</td>
                        <td>{booking.session}</td>
                        <td>{booking.fees}</td>
                        <td>{booking.paymentId}</td>
                        <td>{booking.customer_contact}</td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-primary"
                            onClick={() => handlePetDetails(booking)}
                          >
                            Pet Details
                          </button>
                        </td>
                        <td>
                          {booking.status === "1"
                            ? "Confirmed"
                            : booking.status === "2"
                            ? "Cancelled"
                            : "Pending"}
                        </td>
                        <td>
                          {booking.status !== "2" && (
                            <button className="btn btn-danger"
                            onClick={() => handleCancel(booking.booking_id, "grooming")}

                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "Trainers" && bookings.length === 0 && (
                <p>No bookings found for this service center.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Cancel Booking Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to cancel this booking?</h5>
          <textarea
            placeholder="Please provide a reason for cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            style={{
              width: "100%",
              height: "100px",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
      
          <Button variant="danger" onClick={submitCancellation}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
