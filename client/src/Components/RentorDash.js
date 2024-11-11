import React from "react";
import { useNavigate } from "react-router-dom";
import "./RentorDash.css";
import UserProfile from "./UserProfile";

function RentorDash() {
    const navigate = useNavigate();

    return (
        <div className="dashboard">
            <UserProfile/>
            <h1>My Dashboard</h1>
            <div className="grid-container">
                <div className="grid-item" onClick={() => navigate('/houses')}>
                    <div className="card">
                        <div className="card-content">Properties</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/licenses')}>
                    <div className="card">
                        <div className="card-content">Licenses & Agreements</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/title-deeds')}>
                    <div className="card">
                        <div className="card-content">Title Deeds</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/rentalpayment')}>
                    <div className="card">
                        <div className="card-content">Payment History</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/additional-info')}>
                    <div className="card">
                        <div className="card-content">Additional Info</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentorDash;
