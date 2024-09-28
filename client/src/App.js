import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage"; 
import QuestionsPage from "./Components/QuestionsPage";
import AwardsPage from "./Components/AwardsPage";
import NavBar from './Components/NavBar';
import HighlightsofHouses from './Components/HighlightsofHouses';
import HomePage from './Components/HomePage';
import Footer from "./Components/Footer";
<<<<<<< HEAD
import Houses from "./Components/Houses";



=======
import MyPaymentspage from "./Components/MyPaymentspage"; 
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import landingpage from "./Components/landingpage";
>>>>>>> origin/HEAD

function App() {
  
  return (
<<<<<<< HEAD
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
          <Route path="/houses" element={<Houses/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
=======
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
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/landingpage" element={<landingpage/>}/>
      </Routes>
      <Footer /> 
    </BrowserRouter>
>>>>>>> origin/HEAD
  );
}

export default App;
