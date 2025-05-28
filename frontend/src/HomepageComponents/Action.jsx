import React, { useState } from "react";
import { Link } from "react-router-dom";

function Action() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(auth);

  return (
    <>
      <section
        id="call-to-action"
        className="call-to-action section dark-background"
      >
        <img src="assets/img/cta-bg.jpg" alt="Call to Action Background" />
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay={100}
          >
            <div className="col-xl-10">
              <div className="text-center">
                {auth == null ? (
                  <>
                    <h3>Start Converting Leads Automatically</h3>
                    <p>
                      Stop wasting time on manual lead management. Our CRM
                      captures, qualifies, and routes leads so your team can
                      focus on closing deals. It's automation that actually
                      moves the needle.
                    </p>
                    <Link className="cta-btn" to="/roles">
                      Get Started Now
                    </Link>
                  </>
                ) : auth.usertype == 0 ? (
                  <>
                    <h3>Stay Informed and Supported at Every Step</h3>
                    <p>
                      Easily track your support requests, view past
                      interactions, and get quick help when you need it. Our CRM
                      keeps you connected and in control—no more waiting, no
                      more confusion.
                    </p>
                    <Link className="cta-btn" to="/">
                      Home
                    </Link>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Action;
