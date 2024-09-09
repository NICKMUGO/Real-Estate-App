import {BrowserRouter, Routes, Route} from "react-router-dom";
<<<<<<< HEAD
// import LoginPage from "./Components/LoginPage";
import NavBar from "./Components/NavBar";
=======
import LoginPage from "./Components/LoginPage";
import Footer from "./Components/Footer"
>>>>>>> 0c72f0d1a9f3c2d1809be645f6747517e089f5b2
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<NavBar/>}></Route>
=======
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/footer" element={<Footer/>}></Route>
>>>>>>> 0c72f0d1a9f3c2d1809be645f6747517e089f5b2
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
