import React, { useContext, useState } from "react";
import "./NavBar.css";
import { Usercontext } from "./UserContextProvider";
import Logout from "./Logout";

function Navbar() {
    const [user] = useContext(Usercontext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="NavBar">
            <nav>
                <ul className="header">
                   
                    <li>
                        <a href="/">MAKAO Marketplace</a>
                    </li>
                    <li style={{ textAlign: "center" }}>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <button onClick={toggleSidebar} className="sidebar-toggle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>

            {isSidebarOpen && (
                <div className="sidebar">
                    <ul>
                        {/* Common links */}
                        <li>
                            <a href="/homepage">Home</a>
                        </li>
                        <li>
                            <a href="/allproperties">Properties</a>
                        </li>
                        <li>
                            <a href="/About">About</a>
                        </li>

                        {/* Owner-specific links */}
                        {user.role === 'owner' && (
                            <>
                             <li>
                            <a href="/utilitiespage">Utility Page</a>
                             </li>
                                
                                <li>
                                    <a href="/houses">my🏡</a>
                                </li>
                            </>
                        )}

                        {/* Client-specific links */}
                        {user.role === 'client' && (
                            <>
                            <li>
                                    <a href="/rentordash">Client Dashboard</a>
                                </li>
                             <li>
                            <a href="/utilitiespage">Utility Page</a>
                             </li>
                                <li>
                                    <a href="/MyPayments">PayMyRent</a>
                                </li>
                                <li>
                                    <a href="/manageRental">MyRentals</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
        // )}
    );
}

export default Navbar;
