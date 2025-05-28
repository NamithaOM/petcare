import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroSwiper from './Swiper';
import Action from './Action';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutSwiper from './AboutSwiper';

function About() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        {/* Page Title */}
        <div
          className="page-title dark-background"
          data-aos="fade"
          style={{ backgroundImage: "url(assets/img/about-page-title-bg.jpg)" }}
        >
          <div className="container">
            <h1>About</h1>
            <nav className="breadcrumbs"></nav>
          </div>
        </div>
        {/* End Page Title */}
        <div className="terms-container mt-5" data-aos="fade-up" data-aos-delay="200">
          <AboutSwiper />
        </div>
        <HeroSwiper />
        <Action />
      </main>
      <Footer />
    </>
  );
}

export default About;
