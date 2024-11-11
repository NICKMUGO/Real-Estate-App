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
                    {user ? (
                        <li>
                            <a href="/">Welcome🎉 {user.username}</a>
                        </li>
                    ) : (
                        <>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/signup">Sign up</a>
                            </li>
                        </>
                    )}
                    <li>
                        <a href="/aboutusPage">About</a>
                    </li>
                    {user && user.role === 'owner' && ( // Safely checking user
                        <>
                            <li>
                                <a href="/utilitiespage">Utility Page</a>
                            </li>
                            <li>
                                <a href="/houses">my🏡</a>
                            </li>
                        </>
                    )}

                    {user && user.role === 'client' && ( // Safely checking user
                        <>
                            <li>
                                <a href="/utilitiespage">Utility Page</a>
                            </li>
                            <li>
                                <a href="/MyPayments">PayMyUtility</a>
                            </li>
                            <li>
                                <a href="/allproperties">Properties</a>
                            </li>
                        </>
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
            {/* {user&& ( */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <ul>
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
                        {user && user.role === 'owner' && (
                            <>
                                <li>
                                    <a href="/rentordash">MyProfile👨🏽‍🦲</a>
                                </li>
                                <li>
                                    <a href="/myrentals">Rentals Overview</a>
                                </li>
                            </>
                        )}
                        {user && user.role === 'client' &&
                            <>
                                <li>
                                    <a href="/rentordash">MyProfile👨🏽‍🦲</a>
                                </li>
                                <li>
                                    <a href="/manageRental">MyRentals</a>
                                </li>
                                <li>
                                    <a href="/payproperty">PayProperty</a>
                                </li>
                            
                            </>
                        }
                        <>
                            {user&&(
                            <Logout/>
                            )}
                        </>
                    </ul>
                </div>
            )}
        </div>
        // )}
    );
}

export default Navbar;
