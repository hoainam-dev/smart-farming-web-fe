import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/pages/home/Home";
import Header from "./components/header/Header";
import Login from "./components/Login/Login"
import NavigationBar from "./pages/NavigationBar";
import Attendance from "./pages/attendance/Attendance";
import SignUpForm from "./pages/admin/user/SignUpForm ";
import ProtectedRoute from "./pages/ProtectedRoute";

import DevicePage from "./pages/devicePage/DevicePage";
import Device from "./components/device/Device";
import PlantPage from "./pages/PlantPage/PlantPage";

function App() {
  
  return (
    <Router>
    <Header />
    <div className="App"> 
      <Routes>
        {/* must logined */}
        <Route element={<NavigationBar />}>
          {/* home */}
          <Route path="/" element={<Home/>}/>
          <Route path="/plance" element={<PlantPage />} />
          {/* admin role */}
          <Route element={<ProtectedRoute />}>
            {/* user */}
            <Route path="/user/create" element={<SignUpForm />} />
            {/* attendance */}
            <Route path="/attendance" element={<Attendance />} />
            {/* devide */}
            <Route path="/device" element={<DevicePage />} />
            <Route path="/device/create" element={<Device />} />
          </Route>
        </Route>
        {/* login */}
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
    {/* <Footer/> */}
  </Router>

  );
}

export default App;
