import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";
import Footer from "./Components/Footer"
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/footer" element={<Footer/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
