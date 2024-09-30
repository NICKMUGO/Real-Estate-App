import React from 'react';
import "./awards.css";
import pic1 from './garbagecollection.jpeg';  
import pic2 from './gym.jpeg'; 
import pic3 from './security.jpeg'; 

function UtilitiesForm() {
  return (
    <div className="container mt-5 utilities-form">
      <h1 className='heading'> Utilities Form</h1>
      <p>
        Introducing Makao MarketPlace, the perfect solution to finding your dream property! 
        Our platform goes beyond just helping you find a home—it connects you with top-tier properties 
        that offer essential utilities to enhance your lifestyle. Here’s how we make sure your comfort 
        and convenience are taken care of:
      </p>

      {/* Image Carousel */}
      <div id="utilitiesCarousel" className="carousel slide smaller-carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#utilitiesCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Garbage Collection"></button>
          <button type="button" data-bs-target="#utilitiesCarousel" data-bs-slide-to="1" aria-label="Gym Membership"></button>
          <button type="button" data-bs-target="#utilitiesCarousel" data-bs-slide-to="2" aria-label="Security"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={pic1} className="d-block w-100" alt="Garbage Collection" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Garbage Collection</h5>
              <p>Enjoy a clean, well-maintained property without the hassle. Our garbage collection service handles all waste, ensuring a pristine environment while you focus on what matters most!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={pic2} className="d-block w-100" alt="Gym Membership" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Gym Membership</h5>
              <p>Imagine having a top-notch gym just steps from your door—no more commutes or crowded fitness centers. Stay fit and healthy with ease, while enjoying the added convenience and value that a property with a gym provides.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={pic3} className="d-block w-100" alt="Security" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Security Charges</h5>
              <p>Enjoy peace of mind with our 24/7 security management, keeping your property safe with expert protection and advanced systems.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#utilitiesCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#utilitiesCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default UtilitiesForm;
