import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = (e) => {
    e.preventDefault();
    // Validate all fields
    if (!name || !email || !subject || !message) {
      alert("All fields are required!");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const param = {
      name,
      email,
      subject,
      message,
    };

    fetch("http://localhost:4000/contact/addcontact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message) {
          alert(result.message); // Show success message from the backend
        }
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <>
      <Header />
      <main className="main">
        {/* Page Title */}
        <div
          className="page-title dark-background"
          data-aos="fade"
          style={{
            backgroundImage: "url(assets/img/contact-page-title-bg.jpg)",
          }}
        >
          <div className="container">
            <h1>Contact</h1>
          </div>
        </div>
        {/* End Page Title */}
        {/* Contact Section */}
        <section id="contact" className="contact section">
          <div
            className="container position-relative"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            <div className="row gy-4">
              <div className="col-lg-5">
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <i className="bi bi-geo-alt flex-shrink-0" />
                  <div>
                    <h3>Address</h3>
                    <p>Kollam, Kerala, India</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <i className="bi bi-telephone flex-shrink-0" />
                  <div>
                    <h3>Call Us</h3>
                    <p>+91 9633726219</p>
                  </div>
                </div>
                {/* End Info Item */}
                <div
                  className="info-item d-flex"
                  data-aos="fade-up"
                  data-aos-delay={400}
                >
                  <i className="bi bi-envelope flex-shrink-0" />
                  <div>
                    <h3>Email Us</h3>
                    <p>anandanajit2000@gmail.com</p>
                  </div>
                </div>
                {/* End Info Item */}
              </div>
              <div className="col-lg-7">
                <form
                  onSubmit={handleContact}
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay={500}
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={6}
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message" />
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>
                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
              {/* End Contact Form */}
            </div>
          </div>
        </section>
        {/* /Contact Section */}
      </main>
      <Footer />
    </>
  );
}

export default Contact;
