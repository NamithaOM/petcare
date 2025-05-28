import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AboutSwiper() {
  return (
    <div className="container my-5">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="about-swiper"
      >
        <SwiperSlide>
          <div className="row align-items-center">
            {/* Text Section */}
            <div className="col-md-6 order-2 order-md-1 px-4 py-3">
              <div className="about-content text-start text-dark">
                <h3>Streamline Your Business with Our CRM</h3>
                <p>
                  This CRM (Customer Relationship Management) system was built using the MERN
                  stack to help businesses manage leads, customers, marketing campaigns, and support tickets — all in one place.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-primary me-2" />
                    Role-based access for Admins, Sales Teams, Marketing, and Support.
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-primary me-2" />
                    Integrated lead tracking, sales pipeline visualization, and performance metrics.
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-primary me-2" />
                    Marketing automation, AI-powered analytics, and customer self-service portal.
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Section */}
            <div className="col-md-6 order-1 order-md-2 mb-4 mb-md-0">
              <div className="about-image text-center">
                <img
                  src="assets/img/about.jpg"
                  alt="About CRM"
                  style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default AboutSwiper;
