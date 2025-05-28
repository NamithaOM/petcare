import React, { useState, useEffect } from "react";
import Header from "../HomepageComponents/Header";
import Footer from "../HomepageComponents/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/Auth.css";

function SupportTicketForm() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!subject || !category || !priority || !message) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      userId: auth?.regId?._id,
      name: auth?.regId?.name,
      email: auth?.email,
      subject,
      category,
      priority,
      message,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/ticket/uploadticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log(result);
      alert("Ticket submitted successfully.");

      setSubject("");
      setCategory("");
      setPriority("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting ticket:", err);
      alert("Failed to submit ticket.");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const bgStyle = {
    backgroundImage:
      "linear-gradient(rgba(19, 34, 52, 0.8), rgba(19, 34, 52, 0.8)), url('/assets/img/blog-page-title-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  };

  const wrapperStyle = {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    marginTop: "85px",
  };

  return (
    <>
      <Header />
      <div className="auth-wrapper" style={bgStyle}>
        <div className="auth-box" style={wrapperStyle} data-aos="fade-up">
          <h2 className="text-white mb-4 text-center">
            Submit a Support Ticket
          </h2>

          <div className="form-group mb-3">
            <label className="text-white">Subject</label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Short title of the issue"
            />
          </div>

          <div className="form-group mb-3">
            <label className="text-white">Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Billing">Billing</option>
              <option value="Technical">Technical</option>
              <option value="Product Issue">Product Issue</option>
              <option value="Feedback">Feedback</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="text-white">Priority Level</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label className="text-white">Message / Description</label>
            <textarea
              className="form-control"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue or feedback in detail"
            ></textarea>
          </div>

          <button className="btn btn-light w-100" onClick={handleSubmit}>
            Submit Ticket
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SupportTicketForm;
