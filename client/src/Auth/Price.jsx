import React from 'react';


export default function Price() {
  return (
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
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Personal</span>
                <span className="price">
                  <sup>$</sup> <span className="number">49</span> <sub>/mos</sub>
                </span>

                <ul className="pricing-text list-unstyled my-4">
                  <li><i className="fa fa-check mr-2 text-success"></i>5 Dog Walk</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Vet Visit</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Pet Spa</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>Free Supports</li>
                </ul>

                <a href="#" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
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
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Business</span>
                <span className="price">
                  <sup>$</sup> <span className="number">79</span> <sub>/mos</sub>
                </span>

                <ul className="pricing-text list-unstyled my-4">
                  <li><i className="fa fa-check mr-2 text-success"></i>5 Dog Walk</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Vet Visit</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Pet Spa</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>Free Supports</li>
                </ul>

                <a href="#" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
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
                  height: '250px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                }}
              ></div>
              <div className="text-center p-4">
                <span className="excerpt d-block">Ultimate</span>
                <span className="price">
                  <sup>$</sup> <span className="number">109</span> <sub>/mos</sub>
                </span>

                <ul className="pricing-text list-unstyled my-4">
                  <li><i className="fa fa-check mr-2 text-success"></i>5 Dog Walk</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Vet Visit</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>3 Pet Spa</li>
                  <li><i className="fa fa-check mr-2 text-success"></i>Free Supports</li>
                </ul>

                <a href="#" className="btn btn-primary d-block px-4 py-2">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
