import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../src/pages/home/Home";
import Header from "./components/header/Header";
import Login from "./components/Login/Login"
import NavigationBar from "./pages/NavigationBar";
import Attendance from "./pages/attendance/Attendance";
import Device from "./pages/admin/device/Device";
import SignUpForm from "./pages/admin/user/SignUpForm ";
import PlantList from "./pages/plant/PlantList";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  
  return (
    <Router>
    <Header />
    <div className="App"> 
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path="/" element={<Home/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/plance" element={<PlantList />} />
            <Route path="/device/create" element={<Device />} />
            <Route path="/user/create" element={<SignUpForm />} />
            {/* attendance */}
            <Route path="/attendance" element={<Attendance />} />
          </Route>
        </Route>
        <Route path="/login" element={ <Login />} />
      </Routes>
    </div>
    {/* <Footer/> */}
  </Router>

  );
}

export default App;
