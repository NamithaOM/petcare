import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function GroomingDetails() {
  const location = useLocation();
  const grooming = location.state?.grooming; // Receive grooming details

  const [showModal, setShowModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [session, setSession] = useState("");

  const handlePayment = () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("You must be logged in to book an appointment.");
      return;
    }
  
    // Step 1: Check availability
    fetch(baseUrl + "check-grooming-availability/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groomingId: grooming.id,
        date: appointmentDate,
        session: session,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.available) {
          alert(data.message || "This slot is unavailable.");
          return;
        }
  
        // Step 2: Proceed with Razorpay
        const options = {
          key: "rzp_test_4Ex6Tyjkp79GFy", // Razorpay key
          amount: grooming.price * 100,
          currency: "INR",
          name: grooming.name,
          description: "Grooming Appointment",
          handler: function (response) {
            // alert(
            //   "Payment Successful! Payment ID: " + response.razorpay_payment_id
            // );
  
            fetch(baseUrl + "create-grooming-booking/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                groomingId: grooming.id,
                userId: storedUserId,
                date: appointmentDate,
                session: session,
                price: grooming.price,
                serviceCenter: grooming.serviceCenter,
                paymentId: response.razorpay_payment_id,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message) {
                  alert("Booking confirmed!");
                  setShowModal(false);
                } else {
                  alert("Error: " + data.error);
                }
              })
              .catch((err) => {
                alert("Booking failed. " + err.message);
              });
          },
          prefill: {
            name: "Pet Care",
            email: "petcare@gmail.com",
            contact: "1234567890",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((err) => {
        alert("Availability check failed: " + err.message);
      });
  };
  

  if (!grooming) {
    return <div>No grooming data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${baseUrl.replace(/\/$/, "")}/${grooming.photo.replace(
                /^\//,
                ""
              )}`}
              alt={grooming.name}
              className="img-fluid rounded"
              style={{ marginTop: "100px" }}
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">{grooming.name}</h2>

            <div className="table-responsive">
              <table className="table borderless">
                <tbody>
                  <tr>
                    <td className="text-start fw-bold">Service Center:</td>
                    <td className="text-end">{grooming.serviceCenter}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Description:</td>
                    <td className="text-end">{grooming.description}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Duration:</td>
                    <td className="text-end">{grooming.duration} </td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Price:</td>
                    <td className="text-end">₹{grooming.price}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Products (Using):</td>
                    <td className="text-end">{grooming.products}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center p-4">
              <button
                className="btn btn-primary d-block px-4 py-2"
                onClick={() => setShowModal(true)}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Grooming Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Select Session</label>
                  <select
                    className="form-control"
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="morning">Morning (10 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 4 PM)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-info" onClick={handlePayment}>
                  Submit & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
