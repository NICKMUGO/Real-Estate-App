
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import LoginPage from './Components/LoginPage';
import AwardsPage from './Components/AwardsPage';
import QuestionsPage from './Components/QuestionsPage';
import HomePage from './Components/HomePage';
import Houses from "./Components/Houses";
import Signup from "./Components/Signup";
import MyPaymentspage from "./Components/MyPaymentspage";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import PayRentPage from "./Components/PayRentPage";
import UserContextProvider from "./Components/UserContextProvider";
import HighlightsofHouses from './Components/HighlightsofHouses';
import PropertyForm from './Components/PropertyForm';
import UtilityProviderForm from './Components/utilityprovider';
import RentalPopup from './Components/RentalPopup';
import PaymentForm from './Components/PaymentForm';
import UtilityPage from './Components/UtilitiesPage';
import UtilitiesForm from './Components/UtilitiesForm';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/highlights" element={<HighlightsofHouses />} />
        <Route path="/MyPayments" element={<MyPaymentspage />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/landingpage" element={<LandingPage/>}/>
        <Route path="/payrent" element={<PayRentPage/>}/>
        <Route path="/houses" element={<Houses/>}/>
        <Route path="/propertyform" element={<PropertyForm/>}/>
        <Route path="/utilityproviderform" element={<UtilityProviderForm/>}/>
        <Route path="/paymentform" element={<PaymentForm/>}/>
        <Route path="/utilitiespage" element={<UtilityPage/>}/>
        <Route path="/rentalpopup" element={<RentalPopup/>}/> 
        <Route path="/utilitiesform" element={<UtilitiesForm/>}/>
      </Routes>
      <Footer /> 
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
