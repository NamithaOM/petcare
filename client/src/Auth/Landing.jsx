import React from "react";

import Header from "./Header";

export default function Landing() {
  return (
    <>
     <Header/>
      <div
        className="hero-wrap js-fullheight"
        style={{ backgroundImage: "url('/assets/images/bg_1.jpg')" }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div
            className="row no-gutters slider-text js-fullheight align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div className="col-md-11 ftco-animate text-center text-">
              <h1 className="mb-4 text-success">
                Highest Quality Care For Pets You'll Love
              </h1>
              <p>
                <a href="#" className="btn btn-primary mr-md-4 py-3 px-4">
                  Learn more <span className="ion-ios-arrow-forward"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
 

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
      
      <section
        className="ftco-appointment ftco-section ftco-no-pt ftco-no-pb img"
        style={{ backgroundImage: "url('assets/images/bg_3.jpg')" }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row d-md-flex justify-content-end">
            <div className="col-md-12 col-lg-6 half p-3 py-5 pl-lg-5 ftco-animate">
              <h2 className="mb-4">Free Consultation</h2>
              <form action="#" className="appointment">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="form-field">
                        <div className="select-wrap">
                          <div className="icon">
                            <span className="fa fa-chevron-down"></span>
                          </div>
                          <select name="" id="" className="form-control">
                            <option value="">Select services</option>
                            <option value="">Cat Sitting</option>
                            <option value="">Dog Walk</option>
                            <option value="">Pet Spa</option>
                            <option value="">Pet Grooming</option>
                            <option value="">Pet Daycare</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-calendar"></span>
                        </div>
                        <input
                          type="text"
                          className="form-control appointment_date"
                          placeholder="Date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="input-wrap">
                        <div className="icon">
                          <span className="fa fa-clock-o"></span>
                        </div>
                        <input
                          type="text"
                          className="form-control appointment_time"
                          placeholder="Time"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="7"
                        className="form-control"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Send message"
                        className="btn btn-primary py-3 px-4"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Petsitting</h2>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia.
              </p>
              <ul className="ftco-footer-social p-0">
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Twitter"
                  >
                    <span className="fa fa-twitter"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Facebook"
                  >
                    <span className="fa fa-facebook"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Instagram"
                  >
                    <span className="fa fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Latest News</h2>
              <div className="block-21 mb-4 d-flex">
                <a
                  className="img mr-4 rounded"
                  style={{ backgroundImage: "url('assets/images/image_1.jpg')" }}
                ></a>
                <div className="text">
                  <h3 className="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href="#">
                        <span className="icon-calendar"></span> April 7, 2020
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-person"></span> Admin
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-chat"></span> 19
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <a
                  className="img mr-4 rounded"
                  style={{ backgroundImage: "url('assets/images/image_2.jpg')" }}
                ></a>
                <div className="text">
                  <h3 className="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href="#">
                        <span className="icon-calendar"></span> April 7, 2020
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-person"></span> Admin
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-chat"></span> 19
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 pl-lg-5 mb-4 mb-md-0">
              <h2 className="footer-heading">Quick Links</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="py-2 d-block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 d-block">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 d-block">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 d-block">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 d-block">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="py-2 d-block">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-md-0">
              <h2 className="footer-heading">Have a Questions?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon fa fa-map"></span>
                    <span className="text">
                      203 Fake St. Mountain View, San Francisco, California, USA
                    </span>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon fa fa-phone"></span>
                      <span className="text">+2 392 3929 210</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon fa fa-paper-plane"></span>
                      <span className="text">info@yourdomain.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p className="copyright" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
