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
                    {user ?(
                    <li style={{ textAlign: "center" }}>
                        <a href="/">Welcome: {user.username}</a>
                    </li>
                    ):(
                        <li style={{ textAlign: "center" }}>
                            <a href="/login">Login</a>
                        </li>
                    )}
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
                    <ul>
                        {/* Common links */}
                        <li>
                            <a href="/allproperties">Properties</a>
                        </li>
                        <li>
                            <a href="/aboutusPage">About</a>
                        </li>
                        {/* Owner-specific links */}
                        {user && user.role === 'owner' && (
                            <>
                                <li>
                                    <a href="/ownerdashboard">Owner-Dashboard</a>
                                </li>
                                <li>
                                    <a href="/utilitiespage">Utility Page</a>
                                </li>
                                <li>
                                    <a href="/houses">my🏡</a>
                                </li>
                                <li>
                                    <a href="/MyPayments">PayMyUtility</a>
                                </li>
                                <li>
                                    <a href="/myrentals">MyRentals</a>
                                </li>
                                <li>
                                    <a href="/statistics">Statistics</a>
                                </li>
                            </>

                        )}

                        {user && user.role === 'client' && (
                            <>
                                <li>
                                    <a href="/rentordash">Client Dashboard</a>
                                </li>
                                <li>
                                    <a href="/utilitiespage">Utility Page</a>
                                </li>
                                <li>
                                    <a href="/MyPayments">PayMyUtility</a>
                                </li>
                                <li>
                                    <a href="/manageRental">MyRentals</a>
                                </li>
                                <li>
                                    <a href="/rental-payments">rental-reciepts</a>
                                </li>
                                <li>
                                    <a href="/payproperty">pay-property</a>
                                </li>
                                <li>
                                    <a href="/statistics">Statistics</a>
                                </li>
                            </>
                        )}
                         <Logout/>
                    </ul>
                </div>
            )}
        </div>
        // )}
    );
}

export default Navbar;
