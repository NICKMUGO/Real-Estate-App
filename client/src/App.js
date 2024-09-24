
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import LoginPage from './Components/LoginPage';
import AwardsPage from './Components/AwardsPage';
import QuestionsPage from './Components/QuestionsPage';
import HomePage from './Components/HomePage';
import HighlightsofHouses from './Components/HighlightsofHouses';
import MyPaymentspage from './Components/MyPaymentspage';
import Signup from './Components/Signup';
import PropertyForm from "./Components/PropertyForm";
import Login from "./Components/Login";

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/property-form" element={<PropertyForm />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
