import React, { useContext, useState } from "react"; 
import "./NavBar.css";
import { Usercontext } from "./UserContextProvider";

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
                        <a href="/homepage">MAKAO Marketplace</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Sign up</a>
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

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <ul>
                        <li>
                            <a href="/houses">Property View</a>
                        </li>
                        <li>
                            <a href="/utilitypage">Utility Page</a>
                        </li>
                        <li>
                            <a href="/payrent">Pay Rent</a>
                        </li>
                    </ul>
                    <button onClick={toggleSidebar} className="close-sidebar-button">Close</button>
                </div>
            )}
        </div>
    );
}

export default Navbar;
