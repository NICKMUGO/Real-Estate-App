import React from "react";
import "./landingpage.css";

function landingpage() {
    return (
        <div>
            <div className="bodytext">
                <h1>Welcome,</h1>
                <h1>Your Dream Home Awaits!</h1>
                {/* 
                <p>Quick Search</p>
                <input type="text" className="input" placeholder="Location" />
                <input type="text" className="input" placeholder="Property Type" />
                <input type="text" className="input" placeholder="Price Range" /> 
                */}
                <button className="navbarbutton">
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
}

export default landingpage;
