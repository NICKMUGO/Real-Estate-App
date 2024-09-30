import React from "react";
import "./NavBar.css";

function Navbar() {
    return (
        <div className="NavBar">
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
                        <a href="/houses">MyProperty</a>
                    </li>
                    <li>
                        <a href="/MyPayments">MyPayments</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
