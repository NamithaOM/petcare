import React, { useEffect, useState } from 'react';
import Header from '../Auth/Header';
import Footer from '../Auth/Footer';
import { baseUrl } from "../util/BaseUrl";
import FeedbackForm from './FeedbackForm';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${baseUrl}list_Item/`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data.StoreItems || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setMessage('Error fetching items');
    }
  };

  useEffect(() => {
    fetch(`${baseUrl}list_servicename/`)
      .then((res) => res.json())
      .then((data) => setServices(data.servicename || []))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <>
      <Header />

      {/* Services Section */}
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2>Our Services</h2>
            </div>
          </div>
          <div className="row">
           
          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/staff-8.jpg')",
                  height: '250px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Doctors</span> <sub></sub>
                </span>
                <a href="/doctor" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/pricing-1.jpg')",
                  height: '250px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Trainer</span> <sub></sub>
                </span>
                <a href="/trainer" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/pricing-3.jpg')",
                  height: '250px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Grooming</span> <sub></sub>
                </span>
                <a href="grooming" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* Purchase Items Section */}
      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2>Purchase</h2>
            </div>
          </div>
          <div className="row">
          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/pricing-1.jpg')",
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Medicine</span> <sub></sub>
                </span>
                <a href="/medicine" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/pricing-1.jpg')",
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Food</span> <sub></sub>
                </span>
                <a href="/food" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="block-7 shadow rounded">
              <div
                className="img rounded-top"
                style={{
                  backgroundImage: "url('/assets/images/pricing-1.jpg')",
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup></sup> <span className="number">Accessory</span> <sub></sub>
                </span>
                <a href="/accessories" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>
            
          </div>
        </div>
      </section>

<FeedbackForm/>
      <Footer />
    </>
  );
}
