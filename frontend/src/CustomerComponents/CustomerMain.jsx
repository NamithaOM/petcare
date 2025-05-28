import React, { useState, useEffect } from "react";
import Header from "../HomepageComponents/Header";
import Footer from "../HomepageComponents/Footer";
import HeroSwiper from "../HomepageComponents/Swiper";
import { Link } from "react-router-dom";
import useScrollBehavior from "../EffectComponents/useScrollBehavior";
import useAOS from "../EffectComponents/useAOS";
import ServerUrl from "../CommonComponents/ServerUrl";

function CustomerMain() {
  useScrollBehavior(); // Hook for scroll behavior
  useAOS(); // Hook for AOS initialization

  // State to hold user data - we'll update this with a useEffect
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage AND fetch latest data
  useEffect(() => {
    // Initially load from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser);

    // Then fetch fresh data from server to ensure it's up-to-date
    if (storedUser && storedUser._id) {
      fetch(`http://localhost:4000/fetch/customerregister`)
        .then((res) => res.json())
        .then((data) => {
          const customer = data.find((c) => c.email === storedUser.email);
          if (customer) {
            // Update localStorage with fresh data
            const updatedUser = {
              ...storedUser,
              regId: customer.regId,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUserData(updatedUser);
          }
        })
        .catch((err) =>
          console.error("Error fetching updated customer data:", err)
        );
    }

    // Set up a listener for storage changes
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUserData(updatedUser);
    };

    // Listen for changes in localStorage (for cross-tab synchronization)
    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener("userDataUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userDataUpdated", handleStorageChange);
    };
  }, []);

  // If user data is still loading, show minimal loading state
  if (!userData) {
    return (
      <>
        <Header />
        <main className="main">
          <div className="container mt-5 text-center">
            <p>Loading your profile...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="main">
        {/* Hero Section */}
        <section
          id="hero"
          className="hero section dark-background position-relative"
        >
          {userData?.regId?.image ? (
            <img
              src={ServerUrl + userData.regId.image}
              alt="Customer profile"
              data-aos="fade-in"
              className="img-fluid d-block ms-auto"
              style={{
                maxHeight: "100vh",
                width: "60%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          ) : (
            <img
              src="assets/img/hero-bg.jpg"
              alt="Default hero"
              data-aos="fade-in"
            />
          )}
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <h1 data-aos="fade-up">Welcome, {userData.regId.name}</h1>
                <blockquote data-aos="fade-up" data-aos-delay={100}>
                  <p>
                    Access your account, track your support tickets, and manage
                    your service requests in one place. Our CRM ensures a smooth
                    experience, putting you in control of your customer journey.
                  </p>
                </blockquote>
                <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                  {/* No registration/login buttons needed here since user is already logged in */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Hero Section */}
        <HeroSwiper />
        {/* Services Section */}
        <section id="services" className="services section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Services</h2>
            <p>
              Everything you need to automate, track, and grow your customer
              relationships in one place.
            </p>
          </div>
          {/* End Section Title */}
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="icon flex-shrink-0">
                  <i className="bi bi-briefcase" style={{ color: "#f57813" }} />
                </div>
                <div>
                  <h4 className="title">Automated Lead Capture</h4>
                  <p className="description">
                    Collect leads from websites, forms, and social media
                    channels automatically—no more manual entry.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-card-checklist"
                    style={{ color: "#15a04a" }}
                  />
                </div>
                <div>
                  <h4 className="title">Lead Scoring & Qualification</h4>
                  <p className="description">
                    Use intelligent filters and scoring to prioritize high-value
                    leads and focus your sales effort where it counts.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="icon flex-shrink-0">
                  <i className="bi bi-bar-chart" style={{ color: "#d90769" }} />
                </div>
                <div>
                  <h4 className="title">Sales Pipeline Visualization</h4>
                  <p className="description">
                    Track every deal across your pipeline with a clean,
                    drag-and-drop interface designed for clarity and speed.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="icon flex-shrink-0">
                  <i className="bi bi-diagram-3" style={{ color: "#15bfbc" }} />
                </div>
                <div>
                  <h4 className="title">Smart Lead Routing</h4>
                  <p className="description">
                    Automatically assign leads to the right team or rep based on
                    predefined rules, regions, or deal size.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={500}
              >
                <div className="icon flex-shrink-0">
                  <i
                    className="bi bi-graph-up-arrow"
                    style={{ color: "#f5cf13" }}
                  />
                </div>
                <div>
                  <h4 className="title">Performance Analytics</h4>
                  <p className="description">
                    Measure team performance, lead conversion rates, and
                    campaign ROI with easy-to-understand dashboards.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div
                className="col-lg-4 col-md-6 service-item d-flex"
                data-aos="fade-up"
                data-aos-delay={600}
              >
                <div className="icon flex-shrink-0">
                  <i className="bi bi-chat-dots" style={{ color: "#1335f5" }} />
                </div>
                <div>
                  <h4 className="title">Integrated Communication</h4>
                  <p className="description">
                    Log emails, calls, and SMS directly within the CRM to keep
                    your entire team in sync with every customer interaction.
                  </p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CustomerMain;
