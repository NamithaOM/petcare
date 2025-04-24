import React from 'react'
import Footer from './Footer'
import Header from './Header'

export default function About() {
  return (
   <>
<Header/>

<section className="hero-wrap hero-wrap-2" style={{ backgroundImage: "url('/assets/images/bg_2.jpg')" }} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text align-items-end">
          <div className="col-md-9 ftco-animate pb-5">
          	<p className="breadcrumbs mb-2"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward"></i></a></span> <span>Contact <i className="ion-ios-arrow-forward"></i></span></p>
            <h1 className="mb-0 bread">About</h1>
          </div>
        </div>
      </div>
    </section>
    
    <section className="ftco-section ftco-no-pt ftco-no-pb">
    	<div className="container">
    		<div className="row d-flex no-gutters">
    			<div className="col-md-5 d-flex">
    				<div className="img img-video d-flex align-self-stretch align-items-center justify-content-center justify-content-md-center mb-4 mb-sm-0" style={{ backgroundImage: "url('/assets/images/about-1.jpg')" }}
>
    				</div>
    			</div>
    			<div className="col-md-7 pl-md-5 py-md-5">
    				<div className="heading-section pt-md-5">
	            <h2 className="mb-4">Why Choose Us?</h2>
    				</div>
    				<div className="row">
	    				<div className="col-md-6 services-2 w-100 d-flex">
	    					<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-stethoscope"></span></div>
	    					<div className="text pl-3">
	    						<h4>Care Advices</h4>
	    						<p>Far far away, behind the word mountains, far from the countries.</p>
	    					</div>
	    				</div>
	    				<div className="col-md-6 services-2 w-100 d-flex">
	    					<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-customer-service"></span></div>
	    					<div className="text pl-3">
	    						<h4>Customer Supports</h4>
	    						<p>Far far away, behind the word mountains, far from the countries.</p>
	    					</div>
	    				</div>
	    				<div className="col-md-6 services-2 w-100 d-flex">
	    					<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-emergency-call"></span></div>
	    					<div className="text pl-3">
	    						<h4>Emergency Services</h4>
	    						<p>Far far away, behind the word mountains, far from the countries.</p>
	    					</div>
	    				</div>
	    				<div className="col-md-6 services-2 w-100 d-flex">
	    					<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-veterinarian"></span></div>
	    					<div className="text pl-3">
	    						<h4>Veterinary Help</h4>
	    						<p>Far far away, behind the word mountains, far from the countries.</p>
	    					</div>
	    				</div>
	    			</div>
	        </div>
        </div>
    	</div>
    </section>


    <Footer/>
   </>
  )
}
