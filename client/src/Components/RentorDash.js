import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RentorDash.css";
import UserProfile from "./UserProfile";
import { Usercontext } from "./UserContextProvider";

function RentorDash() {
    const navigate = useNavigate();
    const[user]= useContext(Usercontext);

    return (
        <div className="dashboard">
            {}
            <UserProfile/>
            <h1>My Dashboard</h1>
            <div className="grid-container">
                <div className="grid-item" onClick={() => navigate('/payProperty')}>
                    <div className="card">
                        <div className="card-content">BuyProperty</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/manageRental')}>
                    <div className="card">
                        <div className="card-content">PayRent</div>
                    </div>
                </div>
                <div className="grid-item" onClick={() => navigate('/MyPayments')}>
                    <div className="card">
                        <div className="card-content">PayUtility</div>
                    </div>
                </div>
            </div>
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

export default RentorDash;
