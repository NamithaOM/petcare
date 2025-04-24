import React, { useEffect, useState } from 'react';
import Header from '../Auth/Header';
import Footer from '../Auth/Footer';

export default function TrainerBookings() {
  const storedUserId = localStorage.getItem("userId");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!storedUserId) {
      alert("You must be logged in to view bookings.");
      return;
    }

    fetch(`http://localhost:8000/view-trainer-booking/${storedUserId}`)
      .then(res => res.json())
      .then(data => {
        if (data.bookings) {
          setBookings(data.bookings);
        }
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });
  }, [storedUserId]);

  return (
    <>
      <Header />
      <div className='container mt-4'>
        <h2 className='mb-3'>My Trainer Bookings</h2>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ServiceCenter</th>
              <th>Trainer</th>
              <th>Appointment Date</th>
              <th>Time</th>
              <th>Payment</th>
              <th>Payment ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.serviceCenter}</td>
                  <td>{booking.triner_name}</td>
                  <td>{new Date(booking.date).toLocaleDateString('en-GB')}</td>

                  <td>{booking.session}</td>
                  <td>{booking.fees}</td>
                  <td>{booking.paymentId}</td>
                  <td>{booking.status === "1" ? "Confirmed" : "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
