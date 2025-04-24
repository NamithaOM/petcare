import React, { useState } from "react";
import { baseUrl } from "../util/BaseUrl";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: "", error: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the stored userId from localStorage
    const storedUserId = localStorage.getItem("userId");
  
    // Ensure user is logged in
    if (!storedUserId) {
      alert("You must be logged in to send feedback.");
      return;
    }
  
    try {
      const res = await fetch(baseUrl + "feedback/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: formData.name, // match backend's expected field
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          userId: storedUserId, // Pass the userId to the backend
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setStatus({
          success: data.message || "Message sent successfully!",
          error: "",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          success: "",
          error: data.error || "Something went wrong!",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus({ success: "", error: "Failed to send message." });
    }
  };
  

  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Feedback Form</h3>
                      {/* Success and error messages */}
                      {status.success && (
                        <p style={{ color: "green" }}>{status.success}</p>
                      )}
                      {status.error && (
                        <p style={{ color: "red" }}>{status.error}</p>
                      )}

                      <form
                        method="POST"
                        id="contactForm"
                        name="contactForm"
                        className="contactForm"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="name">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="subject">
                                Subject
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                id="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="message">
                                Message
                              </label>
                              <textarea
                                name="message"
                                className="form-control"
                                id="message"
                                cols="30"
                                rows="4"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Send Message"
                                className="btn btn-primary"
                              />
                              <div className="submitting"></div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-stretch">
                    <div
                      className="info-wrap w-100 p-5 img"
                      style={{
                        backgroundImage: "url('assets/images/img.jpg')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
