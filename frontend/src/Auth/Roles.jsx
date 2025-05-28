import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../HomepageComponents/Header';
import Footer from '../HomepageComponents/Footer';

function Roles() {
  const cardStyle = {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    textAlign: 'center',
    height: '100%',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  };

  const iconStyle = (color) => ({
    fontSize: '3rem',
    color,
    marginBottom: '1rem',
  });

  const btnStyle = (color) => ({
    border: `1px solid ${color}`,
    color: color,
    backgroundColor: 'transparent',
    padding: '0.5rem 1.2rem',
    borderRadius: '6px',
    marginTop: '1rem',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  });

  return (
    <>
      <Header />
      <section id="roles" className="services section mt-5">
        <div className="container text-center mt-5" data-aos="fade-up">
          <h2>Select Your Role</h2>
          <p>Please choose your role to continue with registration</p>
        </div>

        <div className="container mt-4">
          <div className="row gy-4 justify-content-center">

            {/* Customer */}
            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={100}>
              <div style={cardStyle}>
                <i className="bi bi-person" style={iconStyle('#4e91f9')} />
                <h5 style={{ fontWeight: '600' }}>Customer</h5>
                <p>Self-service portal for profile management and ticket tracking.</p>
                <Link
                  to="/customerregister"
                  style={btnStyle('#4e91f9')}
                  onMouseOver={e => e.target.style.backgroundColor = '#eaf3fe'}
                  onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                >
                  Continue as Customer
                </Link>
              </div>
            </div>

            {/* Customer Service */}
            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={200}>
              <div style={cardStyle}>
                <i className="bi bi-headset" style={iconStyle('#15bfbc')} />
                <h5 style={{ fontWeight: '600' }}>Customer Service</h5>
                <p>Resolve issues, manage tickets, and view customer interactions.</p>
                <Link
                  to="/customerserviceregister"
                  style={btnStyle('#15bfbc')}
                  onMouseOver={e => e.target.style.backgroundColor = '#e2f8f7'}
                  onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                >
                  Continue as Service Agent
                </Link>
              </div>
            </div>

            {/* Sales Representative */}
            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={300}>
              <div style={cardStyle}>
                <i className="bi bi-bar-chart-line" style={iconStyle('#f57813')} />
                <h5 style={{ fontWeight: '600' }}>Sales Representative</h5>
                <p>Manage leads, track sales, and forecast your pipeline.</p>
                <Link
                  to="/salesrepresentativeregister"
                  style={btnStyle('#f57813')}
                  onMouseOver={e => e.target.style.backgroundColor = '#fff4eb'}
                  onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
                >
                  Continue as Sales Rep
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Roles;
