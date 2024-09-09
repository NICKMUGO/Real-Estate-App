import React from 'react';
import "./HighlightsofHouses.css";
function HighlightsofHouses() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="slideshow">
            <button className="slide-btn slide-btn-1"></button>
            <button className="slide-btn slide-btn-2"></button>
            <button className="slide-btn slide-btn-3"></button>
            <button className="slide-btn slide-btn-4"></button>
            <div className="slideshow-wrapper">
              <div className="slide">
                <img className="slide-img" src="/kilimanjaro.jpg" alt="Kilimanjaro" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/malawi.jpg" alt="Malawi" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/Meraki.jpeg" alt="Meraki" />
              </div>
              <div className="slide">
                <img className="slide-img" src="/rwen.jpeg" alt="Rwenzori Mountains" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighlightsofHouses;
