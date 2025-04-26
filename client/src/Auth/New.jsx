import React from 'react'

export default function New() {
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center pb-5 mb-3">
          <div className="col-md-7 heading-section text-center ftco-animate">
            <h2>Pets Gallery</h2>
          </div>
        </div>

        <div className="row">
          {[
            { img: '/assets/images/gallery-1.jpg', type: 'Cat', name: 'Persian Cat' },
            { img: '/assets/images/gallery-2.jpg', type: 'Dog', name: 'Pomeranian' },
            { img: '/assets/images/gallery-3.jpg', type: 'Cat', name: 'Sphynx Cat' },
            { img: '/assets/images/gallery-4.jpg', type: 'Cat', name: 'British Shorthair' },
            { img: '/assets/images/gallery-5.jpg', type: 'Dog', name: 'Beagle' },
            { img: '/assets/images/gallery-6.jpg', type: 'Dog', name: 'Pug' },
          ].map((item, index) => (
            <div className="col-md-4 ftco-animate" key={index}>
              <div
                className="work mb-4 img d-flex align-items-end"
                style={{ backgroundImage: `url('${item.img}')` }}
              >
                <a href={item.img} className="icon image-popup d-flex justify-content-center align-items-center">
                  <span className="fa fa-expand"></span>
                </a>
                <div className="desc w-100 px-4">
                  <div className="text w-100 mb-3">
                    <span>{item.type}</span>
                    <h2><a href="work-single.html">{item.name}</a></h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
