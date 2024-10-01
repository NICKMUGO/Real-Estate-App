import Footer from "./Footer";
import {BrowserRouter, Routes, Route} from "react-router-dom";
// Define your component or function
import "./Houses.css";
import House1 from "./House-1.jpg";
import House2 from "./House-2.jpg";
import House3 from "./House-3.jpg";
import House4 from "./House-4.jpg";
  

function Houses() {
    return (
      <div class="main">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
</style>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet"></link>
          <div id="input">
                <input type="text" class="input" id="location" placeholder="Location"></input>
                <input type="text" class="input" placeholder="Property Type"></input>
                <button id="search">Search</button>
          </div><br></br>
          <center>
          <div class="house-display">
            <div>
            <div class="div-img"><img src={House1} class="img"></img><br></br>Owner Name:<br></br>Address:<br></br>Property Type:<br></br>Status:<br></br>Price:<br></br>Description:<br></br></div>
            <div class="div-img"><img src={House2} class="img"></img><br></br>Owner Name:<br></br>Address:<br></br>Property Type:<br></br>Status:<br></br>Price:<br></br>Description:<br></br></div><br></br>
            </div>
            <div>
            <div class="div-img"><img src={House3} class="img"></img><br></br>Owner Name:<br></br>Address:<br></br>Property Type:<br></br>Status:<br></br>Price:<br></br>Description:<br></br></div>
            <div class="div-img"><img src={House4} class="img"></img><br></br>Owner Name:<br></br>Address:<br></br>Property Type:<br></br>Status:<br></br>Price:<br></br>Description:<br></br></div><br></br>
            </div>
          </div>
          </center>
      </div>
    );
  }

  export default Houses;
  