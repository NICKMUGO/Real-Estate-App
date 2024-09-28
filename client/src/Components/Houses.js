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
      <div>
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
                <input type="text" class="input" placeholder="Location"></input>
                <input type="text" class="input" placeholder="Property Type"></input>
                <input type="text" class="input" placeholder="Price Range"></input>
                <input type="text" class="input" placeholder="Keywords"></input>
                <button class="search">Search</button>
          </div><br></br>
          <center>
          <div class="house-display">
            <img src={House1} class="img"></img>
            <img src={House2} class="img"></img><br></br>
            <img src={House3} class="img"></img>
            <img src={House4} class="img"></img><br></br>
          </div>
          </center>
      </div>
    );
  }

  export default Houses;
  