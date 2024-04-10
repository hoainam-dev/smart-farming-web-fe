import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Attendance from "../pages/attendance/Attendance";

function Routers(props) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <Routes>
      <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default Routers;
