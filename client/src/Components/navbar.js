import {BrowserRouter, Routes, Route} from "react-router-dom";

// Define your component or function
function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">Sign Up</a>
                    </li>
                    <li>
                        <a href="/searchbar">Sign Up</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

// Export your component or function
export default Navbar;