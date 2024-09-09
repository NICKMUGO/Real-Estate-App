import Footer from "./Footer";
import HighlightsofHouses from "./HighlightsofHouses";
import Navbar from "./NavBar";

function HomePage() {
    return (
      <div>
          {/* <h1>Hello Wolrd</h1> */}
          <Navbar/>
          <br></br><br></br><br></br>
          <HighlightsofHouses/>
          <br></br><br></br><br></br>
          <Footer />
      </div>
    );
  }
  
  export default HomePage;
  