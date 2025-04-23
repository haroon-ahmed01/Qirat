import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import SplashScreen from './SplashScreen';
import Surah from './Surah' ;

function App() {
 return(
  <Router>
    <Routes>
      <Route path="/" element={<SplashScreen />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/surah" element={<Surah />}/>
    </Routes>
  </Router>
 )
}

export default App;
