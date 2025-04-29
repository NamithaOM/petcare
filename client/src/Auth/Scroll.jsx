import React from 'react';
import './Scroll.css';

export default function Scroll() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero-wrap"
        style={{
          backgroundImage: "url('/assets/images/bg_1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Overlay */}
        <div
          className="overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <p className="mb-4 heading-bold">
            Highest Quality Care For Pets You'll Love
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="ftco-section bg-light" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="row">
            {[
              {
                icon: 'flaticon-blind',
                title: 'Pet Consulting',
                text: "Understanding your dog is the first step to a lifetime of trust and companionship."

              },
              {
                icon: 'flaticon-dog-eating',
                title: 'Pet Training',
                text: "A well-trained pet isn’t just obedient—it’s confident, happy, and deeply connected to you."

              },
              {
                icon: 'flaticon-grooming',
                title: 'Pet Grooming',
                text: "Grooming is not just about beauty—it's about care, comfort, and love."

              },
            ].map((service, index) => (
              <div key={index} className="col-md-4 d-flex align-self-stretch px-4 mb-5">
                <div className="service-card text-center">
                  <div className="icon-wrapper mb-4">
                    <span className={service.icon}></span>
                  </div>
                  <div className="media-body">
                    <h3 className="heading">{service.title}</h3>
                    <p>{service.text}</p>
                    <a href="#" className="btn-custom d-flex align-items-center justify-content-center">
                      <span className="fa fa-chevron-right"></span>
                      <i className="sr-only">Read more</i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
