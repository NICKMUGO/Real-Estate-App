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
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
</style>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
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
                            <a href="/MyRent">MyRent</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="bodytext">
                <h1>Welcome,</h1>
                <h1>Your Dream Home Awaits!</h1>
                {/* <p>Quick Search</p>
                <input type="text" class="input" placeholder="Location"></input>
                <input type="text" class="input" placeholder="Property Type"></input>
                <input type="text" class="input" placeholder="Price Range"></input> */}
                <button>
                    <span>Search</span>
                    </button>
            </div>

        
        </div>
    );
}
export default Navbar;