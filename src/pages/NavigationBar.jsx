import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Home from "../pages/home/Home"
function NavigationBar() {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decodedToken = jwt_decode(token);
        if (!decodedToken.user_id) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return <Home/>; // Trả về null để không hiển thị bất kỳ giao diện nào
}

export default NavigationBar;
