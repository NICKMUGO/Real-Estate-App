
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
import UserContextProvider from "./Components/UserContextProvider";
import HighlightsofHouses from './Components/HighlightsofHouses';
import PropertyForm from './Components/PropertyForm';
import UtilityProvider from './Components/UtilityProvider';
import RentalPopup from './Components/RentalPopup';
import PaymentForm from './Components/PaymentForm';
import UtilityPage from './Components/UtilitiesPage';
import UtilityPopup from './Components/UtilityPopup';
import AllProperties from './Components/AllPropertiesPage';
import DetailProperty from './Components/DetailProperty';
import MyRentals from './Components/MyRentals';
import RentalDetail from './Components/RentalDetail';
import AboutUs from "./Components/aboutusPage";
import AboutusPage from "./Components/aboutusPage";
import UserProfile from './Components/UserProfile';
import Logout from './Components/Logout';
import ClientRental from './Components/ClientRentals';
import RentalDetailClient from './Components/RentalDetailClient';
import PayRentPopup from './Components/PayRentPopup';
import RentalPayment from './Components/RentalPayment';  
import RentorDash from './Components/RentorDash';
import PayUtility from './Components/PayUtility';
import PayProperty from './Components/PayProperty';
import LeaseForm from './Components/LeaseForm';
import PropertyViewsContext from './Components/PropertyViewsContext';
import Statistics from './Components/Statistics';
import OwnerDash from './Components/OwnerDash';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
      <PropertyViewsContext>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/highlights" element={<HighlightsofHouses />} />
        <Route path="/MyPayments" element={<MyPaymentspage />} />
        <Route path="/questions" element={<QuestionsPage/>}/>
        <Route path="/landingpage" element={<LandingPage/>}/>
        <Route path="/payrent" element={<PayRentPopup/>}/>
        <Route path="/houses" element={<Houses/>}/>
        <Route path="/propertyform" element={<PropertyForm/>}/>
        <Route path="/utilityprovider" element={<UtilityProvider/>}/>
        <Route path="/paymentform" element={<PaymentForm/>}/>
        <Route path="/utilitiespage" element={<UtilityPage/>}/>
        <Route path="/utilityform" element={<UtilityPopup/>}/>
        <Route path="/rentalpopup" element={<RentalPopup/>}/>
        <Route path='/allproperties' element={<AllProperties/>}/>
        <Route path="/property/:id" element={<DetailProperty/>} />
        <Route path="/myrentals" element={<MyRentals/>} />
        <Route path="/rental/:id" element={<RentalDetail/>} />
        <Route path="/aboutusPage" element={<AboutusPage/>} />
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/manageRental' element={<ClientRental/>}/>
        <Route path="/rentalClient/:id" element={<RentalDetailClient/>} />
        <Route path="/rental-payments" element={<RentalPayment />} />
        <Route path="/rentordash" element={<RentorDash />} />
        <Route path="/payUtility" element={<PayUtility/>} />
        <Route path="/payproperty" element={<PayProperty/>} />
        <Route path="/lease-form" element={<LeaseForm />} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/ownerdash" element={<OwnerDash/>} />

      </Routes>
      <Footer /> 
      </PropertyViewsContext>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
