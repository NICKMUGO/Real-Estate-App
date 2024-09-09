import {BrowserRouter, Routes, Route} from "react-router-dom";
// Define your component or function
import "./NavBar.css";
function Navbar() {
    return (
        <div>
            {/* Add a self-closing tag for the 'link' element */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
            <div>
                <nav>
                    <ul className="header">
                        
                        <li>
                            <a href="/">MAKAO Marketplace</a>
                        </li>
                        <li>
                            <a href="/login">LOGIN</a>
                        </li>
                        <li>
                            <a href="/signup">SIGN UP</a>
                        </li>
                        <li>
                            <a href="/About">ABOUT</a>
                        </li>
                        <li>
                            <a href="/MyProperties">MyProperty</a>
                        </li>
                        <li>
                            <a href="/MyRent">MyRent</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="bodytext">
                <h1>Welcome</h1>
                <h1>What are we looking for?</h1>
                <p>Quick Search</p>
                <input type="text" class="input" placeholder="Location"></input>
                <input type="text" class="input" placeholder="Property Type"></input>
                <input type="text" class="input" placeholder="Price Range"></input>
                <button>
                    <span>SEARCH</span>
                    </button>
            </div>

        
        </div>
    );
}
// Export your component or function
export default Navbar;