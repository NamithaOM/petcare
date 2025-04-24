import React from 'react'

export default function Forms() {
  return (
    <section className="ftco-appointment ftco-section ftco-no-pt ftco-no-pb img"   style={{ backgroundImage: "url('assets/images/bg_3.jpg')" }}
 >
  <div className="overlay"></div>
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-md-10 col-lg-8 p-4 p-md-5 bg-white rounded shadow-lg mt-5 ftco-animate">
        <h2 className="mb-4 text-center">Free Consultation</h2>
        <form action="#" className="appointment">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <div className="form-field">
                  <div className="select-wrap">
                    <div className="icon"><span className="fa fa-chevron-down"></span></div>
                    <select name="service" className="form-control">
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
            
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name"/>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Vehicle Number"/>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-group">
                <div className="input-wrap">
                  <div className="icon"><span className="fa fa-calendar"></span></div>
                  <input type="text" className="form-control appointment_date" placeholder="Date"/>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="form-group">
                <div className="input-wrap">
                  <div className="icon"><span className="fa fa-clock-o"></span></div>
                  <input type="text" className="form-control appointment_time" placeholder="Time"/>
                </div>
              </div>
            </div>

            <div className="col-md-12 mb-3">
              <div className="form-group">
                <textarea cols="30" rows="4" className="form-control" placeholder="Message"></textarea>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <div className="form-group">
                <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5"/>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</section>

  )
}
