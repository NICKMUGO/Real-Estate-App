import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./Components/LoginPage"; 
import QuestionsPage from "./Components/QuestionsPage"
import AwardsPage from "./Components/AwardsPage";
import './awards.css';
import pic1 from './pic1.jpeg';  
import pic2 from './pic2.jpeg'; 
import pic3 from './pic3.jpeg'; 


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}></Route>
          <Route path="/awards" element={<AwardsPage/>}></Route>
          <Route path="/questions" element={<QuestionsPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
