import {BrowserRouter, Routes, Route} from "react-router-dom";
// import LoginPage from "./Components/LoginPage";
import NavBar from "./Components/NavBar";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
