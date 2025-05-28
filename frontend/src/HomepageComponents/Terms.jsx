import React from 'react';
import '../Styles/Terms.css';
import Header from './Header';
import Footer from './Footer';
import TermsSwiper from './TermsSwiper';

function Terms() {
  return (
    <>
      <Header />
      <div
        className="terms-wrapper mt-5"
        // style={{
        //   backgroundImage: "url('/assets/img/cta-bg.jpg')",
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundAttachment: 'fixed',
        // }}
      >
        <div className="terms-container mt-5" data-aos="fade-up" data-aos-delay="200">
          <TermsSwiper />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
