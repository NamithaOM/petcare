import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token); 
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('userId', data.user_id);
        // Redirect or navigate as needed
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Error connecting to server');
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
                      <h3 className="mb-4">Login</h3>

                      {message && <p style={{ color: 'green' }}>{message}</p>}
                      {error && <p style={{ color: 'red' }}>{error}</p>}

                      <form onSubmit={handleSubmit} className="contactForm">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="username">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="username"
                                id="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="label" htmlFor="password">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                          <div className="text-center">
                          If you are a new user &nbsp; &nbsp;
                    <a className="normal" href="/register">
                      Create an Account!
                    </a>
                  </div>
</div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-5 d-flex align-items-stretch">
                    <div
                      className="info-wrap w-100 p-5 img"
                      style={{ backgroundImage: "url('assets/images/img.jpg')" }}
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
