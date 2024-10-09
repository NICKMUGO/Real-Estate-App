import React from "react";
import "./landingpage.css";  // Ensure this imports the CSS file

function LandingPage() {
    const navigateToProperties = () => {
        window.location.href = "/allproperties";
    };

    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
            <div className="bodytext">
                <h1>Welcome,</h1>
                <h1>Your Dream Home Awaits!</h1>
                <button className="navbarbutton" onClick={navigateToProperties}>
                    <span>SEARCH</span>
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
