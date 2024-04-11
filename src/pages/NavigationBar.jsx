import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { Alert } from "../components/alert/Alert";

function NavigationBar() {
  const token = Cookies.get("token");

  const [isLogined, setIsLogined] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setIsLogined(false);
    } else {
      try {
        const decodedToken = jwt_decode(token);
        if (!decodedToken.user_id) {
          setIsLogined(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLogined(false);
      }
    }
  }, [token]);

  return isLogined ? (
    <Outlet />
  ) : (
    <>
      {Alert(1500, 'Thông báo', 'Bạn Phải đăng nhập trước!','warning', 'OK')}
      <Navigate to="/login" replace state={{ from: location }} />
    </>
  );
};


export default NavigationBar;
