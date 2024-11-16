import React from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDash.css";
import UserProfile from "./UserProfile";

function OwnerDash() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* Optional User Profile Section */}
            {/* <UserProfile /> */}
            
            <h1>Owner Dashboard</h1>
            
            <div className="grid-container">
                <div className="grid-item" onClick={() => navigate('/houses')}>
                    <div className="card">
                        <div className="card-content">Properties</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/propertyform')}>
                    <div className="card">
                        <div className="card-content">Add Property</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/property/:id')}>
                    <div className="card">
                        <div className="card-content">Property Details</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/rental/:id')}>
                    <div className="card">
                        <div className="card-content">Rental Details</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/title-deeds')}>
                    <div className="card">
                        <div className="card-content">Title Deeds</div>
                    </div>
                </div>
            </div>
            
            {/* Agreement Section */}
            <div className="agreement-section">
                <h2>Agreement</h2>
                <img 
                    src="disagreementForm.jpg" 
                    alt="Agreement Illustration" 
                    className="agreement-image" 
                />
            </div>
        </div>
    );
}

export default OwnerDash;
