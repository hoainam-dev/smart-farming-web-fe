import "./App.css";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/pages/home/Home";
import Header from "./components/header/Header";
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import NavigationBar from "./pages/NavigationBar";
import Attendance from "./pages/attendance/Attendance";
import Device from "./pages/admin/device/Device";
import SignUpForm from "./pages/admin/user/SignUpForm ";
import PlantList from "./pages/plant/PlantList";

function App() {
  return (
    <Router>
    <Header />
    <div className="App"> 
      <Routes>
        <Route path="/" element={<NavigationBar><Home/></NavigationBar>}/>
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plance" element={<PlantList />} />
        <Route path="/device/create" element={<Device />} />
        <Route path="/user/create" element={<SignUpForm />} />
        {/* attendance */}
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </div>
    {/* <Footer/> */}
  </Router>

  );
}

export default App;
