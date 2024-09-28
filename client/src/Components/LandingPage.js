import React from "react";
import "./landingpage.css";  // Ensure this imports the CSS file

function LandingPage() {
    return (
        <div className="bodytext">
            <h1>Welcome,</h1>
            <h1>Your Dream Home Awaits!</h1>
            <input type="text" placeholder="Enter location..." />
            <button className="navbarbutton">
                <span>Search</span>
            </button>
        </div>
    );
}

export default LandingPage;
