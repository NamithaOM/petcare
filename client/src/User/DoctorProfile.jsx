import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Auth/Header";
import Footer from "../Auth/Footer";
import { baseUrl } from "../util/BaseUrl";

export default function DoctorProfile() {
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [showModal, setShowModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [session, setSession] = useState("");
  const handlePayment = () => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("You must be logged in to book an appointment.");
      return;
    }
  
    // Step 1: Check availability before payment
    fetch(baseUrl + 'check-doctor-booking-availability/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorid: doctor.id,
        date: appointmentDate,
        session: session,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.available) {
          alert(data.message);
          return;
        }
  
        // Step 2: Proceed with payment if available
        const options = {
          key: "rzp_test_4Ex6Tyjkp79GFy", // Razorpay key
          amount: doctor.fees * 100,
          currency: "INR",
          name: doctor.name,
          description: "Doctor Appointment",
          handler: function (response) {
            // alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
  
            fetch(baseUrl + 'create-doctor-booking/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                doctorid: doctor.id,
                userid: storedUserId,
                date: appointmentDate,
                session: session,
                fees: doctor.fees,
                serviceCenter: doctor.company_name,
                paymentId: response.razorpay_payment_id,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message) {
                  alert('Booking confirmed!');
                  setShowModal(false);
                } else {
                  alert('Error: ' + data.error);
                }
              })
              .catch((err) => {
                alert('Booking failed. ' + err.message);
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
        alert("Failed to check availability. " + err.message);
      });
  };
  
  

  if (!doctor) {
    return <div>No doctor data found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <img
           src={`${baseUrl.replace(/\/$/, '')}/${doctor.photo.replace(/^\//, '')}`}
              alt={doctor.name}
              className="img-fluid rounded"
              style={{marginTop:"100px"}}
            />
          </div>
          <div className="col-md-8">
            <h2 className="text-center mb-4">{doctor.name}</h2>

            <div className="table-responsive">
              <table className="table borderless">
                <tbody>
                <tr>
                    <td className="text-start fw-bold">Service center</td>
                    <td className="text-end">:&nbsp;&nbsp;{doctor.company_name}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Experience</td>
                    <td className="text-end">:&nbsp;&nbsp;{doctor.experience}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Qualification</td>
                    <td className="text-end">:&nbsp;&nbsp;{doctor.qualification}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Contact</td>
                    <td className="text-end">:&nbsp;&nbsp;{doctor.contact}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Fees</td>
                    <td className="text-end">:&nbsp;&nbsp;₹{doctor.fees}</td>
                  </tr>
                  <tr>
                    <td className="text-start fw-bold">Remarks</td>
                    <td className="text-end">:&nbsp;&nbsp;{doctor.remarks}</td>
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
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book Appointment</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
                    <option value="afternoon">After noon (2 PM - 4 PM)</option>
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
