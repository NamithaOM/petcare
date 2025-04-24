import React, { useEffect, useState } from 'react';
import { baseUrl } from '../util/BaseUrl';
import Footer from '../Auth/Footer';
import Header from '../Auth/Header';

export default function Message() {
  const [feedbacks, setFeedbacks] = useState([]);
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!storedUserId) {
      alert('You must be logged in to view messages.');
      return;
    }

    fetch(`${baseUrl}feedback/user/${storedUserId}/`)
      .then(res => res.json())
      .then(data => {
        if (data.feedbacks) {
          setFeedbacks(data.feedbacks);
        } else {
          console.error('No feedbacks found');
        }
      })
      .catch(err => {
        console.error('Error fetching feedback:', err);
      });
  }, [storedUserId]);

  return (
    <>
    <Header/>
    <div className="container py-4">
      <h2 className="mb-4 text-center text-primary">Your Feedback Messages</h2>
      {feedbacks.length === 0 ? (
        <div className="alert alert-info text-center">No messages found.</div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-10">
            {feedbacks.map(fb => (
              <div key={fb.id} className="card mb-4 shadow-sm border-primary">
                <div className="card-body">
                  <h5 className="card-title text-primary">{fb.subject}</h5>
                  <p className="card-text">
                    <strong>Message:</strong> <br />
                    {fb.message}
                  </p>
                  {fb.reply && (
                    <p className="card-text text-success">
                      <strong>Reply:</strong> <br />
                      {fb.reply}
                    </p>
                  )}
                  <p className="card-text">
                    <small className="text-muted">
                      Submitted on: {new Date(fb.created_at).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
