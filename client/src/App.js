import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./Components/LoginPage"; 
import QuestionsPage from "./Components/QuestionsPage"
import AwardsPage from "./Components/AwardsPage";
import NavBar from './Components/NavBar';
import HighlightsofHouses from './Components/HighlightsofHouses';
import HomePage from './Components/HomePage';
import Footer from "./Components/Footer";
import MyPaymentspage from "./Components/MyPaymentspage"; 
import Signup from "./Components/signup";
import Login from "./Components/login";



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
          <Route path="/highlights" element={<HighlightsofHouses/>}></Route>
          <Route path="/MyPayments" element={<MyPaymentspage/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          
    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
