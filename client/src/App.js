import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage"; 
import QuestionsPage from "./Components/QuestionsPage";
import AwardsPage from "./Components/AwardsPage";
import NavBar from './Components/NavBar';
import HighlightsofHouses from './Components/HighlightsofHouses';
import HomePage from './Components/HomePage';
import Footer from "./Components/Footer";
import MyPaymentspage from "./Components/MyPaymentspage"; 


function App() {
  
  return (
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/highlights" element={<HighlightsofHouses />} />
        <Route path="/MyPayments" element={<MyPaymentspage />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
