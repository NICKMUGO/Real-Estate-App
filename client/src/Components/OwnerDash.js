import React from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDash.css";
import UserProfile from "./UserProfile";
import "./RentorDash.css";

function OwnerDash() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* Optional User Profile Section */}
            <UserProfile />
            <h1>Owner Dashboard</h1>
            
            <div className="grid-container">
                <div className="grid-item" onClick={() => navigate('/houses')}>
                    <div className="card">
                        <div className="card-content">MyProperties</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/MyPayments')}>
                    <div className="card">
                        <div className="card-content">PayUtility</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/myrentals')}>
                    <div className="card">
                        <div className="card-content">MyRentals</div>
                    </div>
                </div>
                
            </div>
            
            {/* Agreement and Title Deed Section */}   
            <div className="image-section">
                {/* Agreement */}
                <div className="agreement-section">
                    <h2>Agreement</h2>
                    <img 
                        src="disagreementForm.jpg" 
                        alt="Agreement Illustration" 
                        className="agreement-image"
                    />
                </div>
                {/* Title Deed */}
                <div className="agreement-section">
                    <h2>Title Deed</h2>
                    <img 
                        src="deed.jpg" 
                        alt="Title Deed Illustration" 
                        className="agreement-section"
                    />
                </div>
            </div>
        </div>
    );
}

export default OwnerDash;
