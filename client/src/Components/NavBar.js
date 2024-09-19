import React from "react";
import "./NavBar.css";

function Navbar() {
    return (
        <div>
            <nav>
                <ul className="header">
                    <li>
                        <a href="/">MAKAO Marketplace</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Sign up</a>
                    </li>
                    <li>
                        <a href="/About">About</a>
                    </li>
                    <li>
                        <a href="/MyProperties">MyProperty</a>
                    </li>
                    <li>
                        <a href="/MyPayments">MyRent</a>
                    </li>
                </ul>
            </nav>

            <div className="bodytext">
                <h1>Welcome,</h1>
                <h1>Your Dream Home Awaits!</h1>
                {/* 
                <p>Quick Search</p>
                <input type="text" className="input" placeholder="Location" />
                <input type="text" className="input" placeholder="Property Type" />
                <input type="text" className="input" placeholder="Price Range" /> 
                */}
                <button>
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
}

export default Navbar;
