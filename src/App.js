import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/pages/home/Home";
import Header from "./components/header/Header";
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import NavigationBar from "./pages/NavigationBar";
import Attendance from "./pages/attendance/Attendance";
import SignUpForm from "./pages/admin/user/SignUpForm ";

import DevicePage from "./pages/devicePage/DevicePage";
import PlantPage from "./pages/PlantPage/PlantPage";
import FormCreateDevice from "./pages/admin/device/FormCreateDevice";

function App() {
  return (
    <Router>
    <Header />
    <div className="App"> 
      <Routes>
        <Route path="/" element={<NavigationBar><Home/></NavigationBar>}/>
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plance" element={<PlantPage />} />
        <Route path="/device/create" element={<FormCreateDevice />} />
        <Route path="/user/create" element={<SignUpForm />} />
        <Route path="/device" element={<DevicePage />} />
        {/* attendance */}
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </div>
    {/* <Footer/> */}
  </Router>

  );
}

export default App;
