import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { baseUrl } from "../util/BaseUrl";

export default function Contact() {
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
		}),
	  });
  
	  const data = await res.json();
  
	  if (res.ok) {
		setStatus({ success: data.message || "Message sent successfully!", error: "" });
		setFormData({ name: "", email: "", subject: "", message: "" });
	  } else {
		setStatus({ success: "", error: data.error || "Something went wrong!" });
	  }
	} catch (err) {
	  console.error("Submit error:", err);
	  setStatus({ success: "", error: "Failed to send message." });
	}
  };
  
  return (
    <>
      <Header />
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: "url('/assets/images/bg_2.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end">
            <div className="col-md-9 ftco-animate pb-5">
              <p className="breadcrumbs mb-2">
                <span className="mr-2">
                  <a href="index.html">
                    Home <i className="ion-ios-arrow-forward"></i>
                  </a>
                </span>{" "}
                <span>
                  Contact <i className="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 className="mb-0 bread">Contact</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Contact Form</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row mb-5">
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-map-marker"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Address:</span>opp. Technopark Trivandrum,
                          Thiruvananthapuram, Kerala 695582
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-phone"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Phone:</span>{" "}
                          <a href="tel://1234567920">+91 91785 90000 </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-paper-plane"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Email:</span>{" "}
                          <a href="mailto:info@yoursite.com">
                            petcare@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dbox w-100 text-center">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-globe"></span>
                      </div>
                      <div className="text">
                        <p>
                          <span>Website</span> <a href="#">petcare.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Contact Us</h3>

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

      <Footer />
    </>
  );
}
