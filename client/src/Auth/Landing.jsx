import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Clients from "./Serve";
import Scroll from "./Scroll";

export default function Landing() {
  return (
    <>
     <Header/>

 
<Scroll/>
      {/* <section className="ftco-section bg-light ftco-no-pt ftco-intro">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-self-stretch px-4 ftco-animate">
              <div className="d-block services active text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-blind"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Dog Walking</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right.
                  </p>
                  <a
                    href="#"
                    className="btn-custom d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Read more</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-self-stretch px-4 ftco-animate">
              <div className="d-block services text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-dog-eating"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Pet Daycare</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right.
                  </p>
                  <a
                    href="#"
                    className="btn-custom d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Read more</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-self-stretch px-4 ftco-animate">
              <div className="d-block services text-center">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="flaticon-grooming"></span>
                </div>
                <div className="media-body">
                  <h3 className="heading">Pet Grooming</h3>
                  <p>
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right.
                  </p>
                  <a
                    href="#"
                    className="btn-custom d-flex align-items-center justify-content-center"
                  >
                    <span className="fa fa-chevron-right"></span>
                    <i className="sr-only">Read more</i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

<section className="ftco-section ftco-no-pt ftco-no-pb">
  <div className="container">
    <div className="row d-flex no-gutters">
      <div className="col-md-5 d-flex">
        <div
          className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0"
          style={{ backgroundImage: "url('assets/images/about-1.jpg')" }}
        ></div>
      </div>
      <div className="col-md-7 pl-md-5 py-md-5">
        <div className="heading-section pt-md-5">
          <h2 className="mb-4">Why Choose Us?</h2>
        </div>
        <div className="row">
          <div className="col-md-6 services-2 w-100 d-flex">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="flaticon-stethoscope"></span>
            </div>
            <div className="text pl-3">
              <h4>Care Advices</h4>
              <p>
                "Our team of experts offers trusted care advice to ensure your health and wellness are in the best hands."
              </p>
            </div>
          </div>
          <div className="col-md-6 services-2 w-100 d-flex">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="flaticon-customer-service"></span>
            </div>
            <div className="text pl-3">
              <h4>Customer Support</h4>
              <p>
                "We offer 24/7 customer support to assist you with any queries or concerns. Your satisfaction is our priority."
              </p>
            </div>
          </div>
          <div className="col-md-6 services-2 w-100 d-flex">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="flaticon-emergency-call"></span>
            </div>
            <div className="text pl-3">
              <h4>Emergency Services</h4>
              <p>
                "In case of emergencies, our rapid response team is always ready to provide immediate and effective care."
              </p>
            </div>
          </div>
          <div className="col-md-6 services-2 w-100 d-flex">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="flaticon-veterinarian"></span>
            </div>
            <div className="text pl-3">
              <h4>Veterinary Help</h4>
              <p>
                "We provide expert veterinary help for your pets, ensuring they receive the best possible treatment."
              </p>
            </div>
          </div>
        </div>
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
      
   <Clients/>
<Footer/>
    </>
  );
}
