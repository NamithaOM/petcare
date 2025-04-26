import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Price() {
  return (
    <>
      <Header />
      <section
  className="hero-wrap hero-wrap-2"
  style={{
    backgroundImage: "url('/assets/images/bg_2.jpg')",
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'red', // Makes text visible on dark backgrounds
  }}
  data-stellar-background-ratio="0.5"
>
  <div
    className="overlay"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
      zIndex: 1,
    }}
  ></div>

  <div className="container" style={{ position: 'relative', zIndex: 2 }}>
    <div className="row no-gutters slider-text align-items-end">
      <div className="col-md-9 ftco-animate pb-5">
        <p className="breadcrumbs mb-2" style={{ color: '#fff' }}>
          <span className="mr-2">
            <a href="index.html" style={{ color: '#fff' }}>
              Home <i className="ion-ios-arrow-forward"></i>
            </a>
          </span>{" "}
          <span style={{ color: '#fff' }}>
            Services <i className="ion-ios-arrow-forward"></i>
          </span>
        </p>
        <h1 className="mb-0 bread" style={{ color: '#fff' }}>
          About
        </h1>
      </div>
    </div>
  </div>
</section>



      <section className="ftco-section bg-light py-5">
        <div className="container">
          <div className="row justify-content-center pb-5 mb-3">
            <div className="col-md-7 text-center">
              <h2>Affordable Packages</h2>
            </div>
          </div>

          <div className="row">
            {/* Plan 1 */}
            <div className="col-md-4 mb-4">
              <div className="block-7 shadow rounded">
                <div
                  className="img rounded-top"
                  style={{
                    backgroundImage: "url('/assets/images/pricing-1.jpg')",
                    height: "250px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                  }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Personal</span>
                  <span className="price">
                    <sup></sup> <span className="number">Training</span>
                  </span>

                  <ul className="pricing-text list-unstyled my-4">
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Training Sessions
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Veterinary Check-up
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Grooming Session
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>Starter
                      Accessory Kit
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="col-md-4 mb-4">
              <div className="block-7 shadow rounded">
                <div
                  className="img rounded-top"
                  style={{
                    backgroundImage: "url('/assets/images/pricing-2.jpg')",
                    height: "250px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                  }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Business</span>
                  <span className="price">
                    <sup></sup> <span className="number">Purchasing</span>
                  </span>

                  <ul className="pricing-text list-unstyled my-4">
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>Weekly
                      Food Delivery
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Veterinary Visits
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Grooming Sessions
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>Essential
                      Medicines Included
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="col-md-4 mb-4">
              <div className="block-7 shadow rounded">
                <div
                  className="img rounded-top"
                  style={{
                    backgroundImage: "url('/assets/images/pricing-3.jpg')",
                    height: "250px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                  }}
                ></div>
                <div className="text-center p-4">
                  <span className="excerpt d-block">Ultimate</span>
                  <span className="price">
                    <sup></sup> <span className="number">Consulting</span>
                  </span>

                  <ul className="pricing-text list-unstyled my-4">
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>Unlimited
                      Vet Consultations
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>
                      Grooming Sessions
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i> Trainer
                      Visits
                    </li>
                    <li>
                      <i className="fa fa-check mr-2 text-success"></i>Full
                      Accessory & Medicine Kit
                    </li>
                  </ul>
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
