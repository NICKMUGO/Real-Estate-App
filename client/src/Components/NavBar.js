import React, { useContext } from "react";
import "./NavBar.css";
import { Usercontext } from "./UserContextProvider";

function Navbar() {
    const [user] = useContext(Usercontext);

    return (
        <div className="NavBar">
            <nav>
                <ul className="header">
                    <li>
                        <a href="/homepage">MAKAO Marketplace</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Sign up</a>
                    </li>
                    {user.role === 'owner' ? (
                        <>
                            <li>
                                <a href="/houses">My Properties</a>
                            </li>
                            <li>
                                <a href="/MyPayments">My Utility Payments</a>
                            </li>
                            <li>
                                <a href="/About">About</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="/homepage">MAKAO Marketplace</a>
                            </li>
                            <li>
                                <a href="/allproperties">Properties</a>
                            </li>
                            <li>
                                <a href="/MyPayments">Pay My Rent</a>
                            </li>
                            <li>
                                <a href="/About">About</a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
