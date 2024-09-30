import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage"; 
import QuestionsPage from "./Components/QuestionsPage";
import AwardsPage from "./Components/AwardsPage";
import NavBar from './Components/NavBar';
import HighlightsofHouses from './Components/HighlightsofHouses';
import HomePage from './Components/HomePage';
import Footer from "./Components/Footer";
import PayRentPage from './Components/PayRentPage';
import UtilitiesForm from './Components/UtilitiesForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/awards" element={<AwardsPage/>}></Route>
          <Route path="/questions" element={<QuestionsPage/>}></Route>
          <Route path="/footer" element={<Footer/>}></Route>
          <Route path="/navbar" element={<NavBar/>}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/payrent" element={<PayRentPage/>}></Route>
          <Route path="/highlights" element={<HighlightsofHouses/>}></Route>
          <Route path="/utilitiesform" element={<UtilitiesForm/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
