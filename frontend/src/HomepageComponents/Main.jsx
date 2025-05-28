import React from 'react'
import Header from './Header'
import Footer from './Footer'
import HeroSwiper from './Swiper'
import { Link } from 'react-router-dom'
import Action from './Action'
import useScrollBehavior from '../EffectComponents/useScrollBehavior'
import useAOS from '../EffectComponents/useAOS'
import SplashScreen from '../EffectComponents/SplashScreen'

function Main() {

  useScrollBehavior(); // Hook for scroll behavior
  useAOS(); // Hook for AOS initialization

  return (
    <>
    <SplashScreen/>
    <Header/>
      <main className="main">
        {/* Hero Section */}
        <section id="hero" className="hero section dark-background">
          <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
          <div className="container">
            <div className="row">
              <div className="col-xl-4">
                <h1 data-aos="fade-up">Focus On What Matters</h1>
                <blockquote data-aos="fade-up" data-aos-delay={100}>
                  <p>Automatically capture and prioritize leads so your sales team can concentrate on closing deals. Let our CRM handle the busywork—no more manual entry, no more missed opportunities. </p>
                </blockquote>
                <div className="d-flex" data-aos="fade-up" data-aos-delay={200}>
                  <Link to="/roles" className="btn-get-started">Register</Link>&nbsp;
                  &nbsp;<Link to="/login" className="btn-get-started">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </section>{/* /Hero Section */}
        <HeroSwiper/>
        {/* Services Section */}
        <section id="services" className="services section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Services</h2>
            <p>Everything you need to automate, track, and grow your customer relationships in one place.</p>
          </div>{/* End Section Title */}
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={100}>
                <div className="icon flex-shrink-0"><i className="bi bi-briefcase" style={{color: '#f57813'}} /></div>
                <div>
                  <h4 className="title">Automated Lead Capture</h4>
                  <p className="description">Collect leads from websites, forms, and social media channels automatically—no more manual entry.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={200}>
                <div className="icon flex-shrink-0"><i className="bi bi-card-checklist" style={{color: '#15a04a'}} /></div>
                <div>
                  <h4 className="title">Lead Scoring & Qualification</h4>
                  <p className="description">Use intelligent filters and scoring to prioritize high-value leads and focus your sales effort where it counts.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                <div className="icon flex-shrink-0"><i className="bi bi-bar-chart" style={{color: '#d90769'}} /></div>
                <div>
                  <h4 className="title">Sales Pipeline Visualization</h4>
                  <p className="description">Track every deal across your pipeline with a clean, drag-and-drop interface designed for clarity and speed.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                <div className="icon flex-shrink-0"><i className="bi bi-diagram-3" style={{color: '#15bfbc'}} /></div>
                <div>
                  <h4 className="title">Smart Lead Routing</h4>
                  <p className="description">Automatically assign leads to the right team or rep based on predefined rules, regions, or deal size.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={500}>
                <div className="icon flex-shrink-0"><i className="bi bi-graph-up-arrow" style={{color: '#f5cf13'}} /></div>
                <div>
                  <h4 className="title">Performance Analytics</h4>
                  <p className="description">Measure team performance, lead conversion rates, and campaign ROI with easy-to-understand dashboards.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
              <div className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay={600}>
                <div className="icon flex-shrink-0"><i className="bi bi-chat-dots" style={{color: '#1335f5'}} /></div>
                <div>
                  <h4 className="title">Integrated Communication</h4>
                  <p className="description">Log emails, calls, and SMS directly within the CRM to keep your entire team in sync with every customer interaction.</p>
                  <Link to="#" className="readmore stretched-link"></Link>
                </div>
              </div>
              {/* End Service Item */}
            </div>
          </div>
        </section>
        {/* Call To Action Section */}
        <Action/>
        {/* Features Section */}
        <section id="features" className="features section align-self-end">
          <div className="container">
            <div className="row">
              <div className="col-lg-7" data-aos="fade-up" data-aos-delay={100}>
              <h3 className="mb-0">Smart CRM Features for</h3>
              <h3>Modern Businesses</h3>
                <div className="row gy-4">
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-kanban" style={{ color: '#ff8b2c' }} />
                      <span>Kanban Deal Tracking</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-robot" style={{ color: '#5578ff' }} />
                      <span>AI-Powered Email Replies</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-graph-up-arrow" style={{ color: '#e80368' }} />
                      <span>Sales Forecasting</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-bar-chart" style={{ color: '#ffa76e' }} />
                      <span>Interactive Dashboards</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-ticket-detailed" style={{ color: '#11dbcf' }} />
                      <span>Support Ticketing</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-megaphone" style={{ color: '#4233ff' }} />
                      <span>Campaign Automation</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-person-lines-fill" style={{ color: '#29cc61' }} />
                      <span>Lead Management</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                  <div className="col-md-6">
                    <div className="icon-list d-flex">
                      <i className="bi bi-people" style={{ color: '#ff5828' }} />
                      <span>Role-based Access</span>
                    </div>
                  </div>{/* End Icon List Item*/}
                </div>
              </div>
              <div className="col-lg-5 position-relative" data-aos="zoom-out" data-aos-delay={200}>
                <div className="phone-wrap">
                  <img src="assets\img\homepage_dashboard_preview2.PNG" alt="" className="img-fluid rounded-3 shadow-lg"/>
                </div>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="container">
              <div className="row">
                <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
                  <h4>All-in-One CRM<br />for Scalable Growth</h4>
                  <p>Manage leads, automate tasks, support customers, and analyze performance — all from one powerful CRM built with MERN stack.</p>
                  <Link to="/roles" className="btn-get-started">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
        </section>{/* /Features Section */}
        
      </main>
    <Footer/>
    
    </>
  )
}

export default Main