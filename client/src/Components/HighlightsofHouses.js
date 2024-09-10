import React from 'react';
import "./HighlightsofHouses.css";
function HighlightsofHouses() {
  return (
    <div>
      <div className="container">
        <div className="content"><br></br>
          <h3>Find Your Dream Home: Exclusive Highlights of Our Finest Properties</h3>
          <div className="slideshow">
            <button className="slide-btn slide-btn-1"></button>
            <button className="slide-btn slide-btn-2"></button>
            <button className="slide-btn slide-btn-3"></button>
            <button className="slide-btn slide-btn-4"></button>
            <div className="slideshow-wrapper">
              <div className="slide">
                <img className="slide-img" src="/Meraki.png" alt="Kilimanjaro" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/Kilimanjaro.png" alt="Malawi" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/Malawi.jpg" alt="Meraki" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/Rwen.jpg" alt="Rwenzori Mountains" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightsofHouses;
