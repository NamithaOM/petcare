import React, { useState } from "react";
import AdminSidebar from "../AdminComponents/AdminSidebar";
import AdminNavbar from "../AdminComponents/AdminNavbar";

function LeadForm() {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Manual Entry",
    status: "New",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({ ...lead, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/lead/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Lead created successfully!");
        setLead({
          name: "",
          email: "",
          phone: "",
          source: "Manual Entry",
          status: "New",
          notes: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Error creating lead");
      console.error(error);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminNavbar />
        <div className="container-fluid pt-4 px-4">
          <div className="row">
            <div className="col-12">
              <div className="bg-light rounded p-4">
                <h6 className="mb-4">Create New Lead</h6>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={lead.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={lead.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={lead.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Source</label>
                      <select
                        className="form-select"
                        name="source"
                        value={lead.source}
                        onChange={handleChange}
                      >
                        <option value="Manual Entry">Manual Entry</option>
                        <option value="Contact Form">Contact Form</option>
                        <option value="Referral">Referral</option>
                        <option value="Ad Campaign">Ad Campaign</option>
                      </select>
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={lead.status}
                        onChange={handleChange}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Dropped">Dropped</option>
                      </select>
                    </div>

                    <div className="mb-3 col-md-6">
                      <label className="form-label">Notes</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        rows="4"
                        value={lead.notes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Create Lead
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadForm;
