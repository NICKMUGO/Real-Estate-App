import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";
import Footer from "./Components/Footer"
import HomePage from "./Components/HomePage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/footer" element={<Footer/>}></Route>
          <Route path="/navbar" element={<NavBar/>}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
