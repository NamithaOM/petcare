import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function HeroSwiper() {
  return (
    <section id="why-us" className="why-us section">
      <div className="container">
        <div className="row g-0">

          {/* Left Image with AOS */}
          <div
            className="col-xl-5 img-bg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src="assets/img/why-us-bg.jpg"
              alt="Why Us"
              className="img-fluid"
            />
          </div>

          {/* Swiper Section with AOS */}
          <div
            className="col-xl-7 slides position-relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                speed={600}
                autoplay={{ delay: 5000 }}
                centeredSlides={true}
                slidesPerView={'auto'}
                pagination={{ clickable: true }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="item">
                    <h3 className="mb-3">Let's grow your business together</h3>
                    <h4 className="mb-3">
                      Capture leads automatically and never miss a sales opportunity again.
                    </h4>
                    <p>
                      Streamline your workflow with intelligent lead tracking. Our CRM identifies, collects,
                      and organizes leads in real time—so your team can focus on engaging prospects and closing
                      deals, not managing spreadsheets.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="item">
                    <h3 className="mb-3">Automate Lead Generation with Precision</h3>
                    <h4 className="mb-3">
                      Save time, reduce manual effort, and let the system do the heavy lifting.
                    </h4>
                    <p>
                      Our CRM intelligently captures and qualifies leads from multiple channels—so your team
                      always has fresh, high-quality prospects to work with. Say goodbye to missed follow-ups
                      and hello to consistent conversions.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="item">
                    <h3 className="mb-3">Turn Every Interaction Into a Lead</h3>
                    <h4 className="mb-3">
                      Capture potential customers from forms, emails, and socials—automatically.
                    </h4>
                    <p>
                      Don’t let valuable prospects slip through the cracks. Our CRM auto-lead system gathers
                      data from multiple sources, builds profiles, and routes them to your team in real
                      time—so you can act fast and close faster.
                    </p>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="item">
                    <h3 className="mb-3">Never Miss a Qualified Lead Again</h3>
                    <h4 className="mb-3">
                      Real-time lead capture and smart distribution—so your team acts when it matters most.
                    </h4>
                    <p>
                      Our system monitors every customer touchpoint and automatically routes leads to the
                      right team member. No delays, no bottlenecks—just faster responses and higher conversion
                      rates.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>

              {/* Optional Navigation Buttons (only visible if styled/active) */}
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSwiper;
