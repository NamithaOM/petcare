import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { baseUrl } from "../util/BaseUrl";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    usertype: 'customer'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.contact.length !== 10) {
      setError('Contact number must be 10 digits');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${baseUrl}createCustomer/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User registered successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          contact: '',
          address: '',
          usertype: 'customer'
        });
      } else {
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Error connecting to server.');
    }
  };

  return (
    <>
      <Header />
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7">
                    <div className="contact-wrap w-100 p-md-5 p-4">
                      <h3 className="mb-4">Register Now</h3>

                      {message && <p style={{ color: 'green' }}>{message}</p>}
                      {error && <p style={{ color: 'red' }}>{error}</p>}

                      <form onSubmit={handleSubmit} className="contactForm">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="name">Full Name</label>
                              <input type="text" className="form-control" name="name" id="name" value={formData.name} onChange={handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="email">Email Address</label>
                              <input type="email" className="form-control" name="email" id="email" value={formData.email} onChange={handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="password">Password</label>
                              <input type="password" className="form-control" name="password" id="password" value={formData.password} onChange={handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="label" htmlFor="contact">Contact</label>
                              <input type="number" className="form-control" name="contact" id="contact" value={formData.contact} onChange={handleChange} required />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="address">Address</label>
                              <textarea className="form-control" name="address" id="address" value={formData.address} onChange={handleChange} required />
                            </div>
                          </div>
                         
                          <div className="col-md-12">
                            <div className="form-group">
                              <input type="submit" value="Register" className="btn btn-primary" />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-stretch">
                    <div className="info-wrap w-100 p-5 img" style={{ backgroundImage: "url('assets/images/img.jpg')" }}></div>
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
