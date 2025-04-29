import React from 'react';
import './serve.css';

export default function Clients() {
  const testimonials = [
    {
      img: '/assets/images/person_1.jpg',
      quote:
        "They took amazing care of my dog! It's so rare to find people who treat pets like family.",
      name: 'Emma Johnson',
      position: 'Pet Owner & Blogger',
    },
    {
      img: '/assets/images/person_2.jpg',
      quote:
        "Highly professional service! My cat actually looks forward to grooming day now.",
      name: 'David Miller',
      position: 'Veterinarian',
    },
    {
      img: '/assets/images/person_3.jpg',
      quote:
        "Their training methods worked wonders for my energetic pup. I couldn’t be happier!",
      name: 'Sophia Williams',
      position: 'Animal Behaviorist',
    },
  ];

  return (
    <section
      className="ftco-section testimony-section"
      style={{
        backgroundImage: "url('/assets/images/bg_2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="overlay"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '50px 0' }}>
        <div className="row justify-content-center pb-5 mb-3">
          <div className="col-md-7 heading-section text-center">
            <h2 style={{ color: '#fff' }}>Happy Clients & Feedbacks</h2>
          </div>
        </div>
        <div className="row">
          {testimonials.map((t, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="testimony-wrap p-4 bg-white rounded shadow-sm">
                <div className="icon d-flex align-items-center justify-content-center mb-3">
                  <span className="fa fa-quote-left fa-2x text-white p-5"></span>
                </div>
                <p className="mb-4">{t.quote}</p>
                <div className="d-flex align-items-center">
                  <div
                    className="user-img rounded-circle"
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundImage: `url('${t.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      marginRight: '15px',
                    }}
                  ></div>
                  <div>
                    <p className="name mb-0">{t.name}</p>
                    <span className="position text-muted">{t.position}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
