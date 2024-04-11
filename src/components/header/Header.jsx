import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";


import Logo from "../../assets/images/logo.png";

import "./header.css";
import { increase } from "../../redux/counterSlice";

function Header() {
  const token = Cookies.get("token");
  const [isAdmin, setIsAdmin] = useState(false);

  const counter = useSelector((state) => state.counter?.value);

  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
    } else {
        try {
            const decodedToken = jwt_decode(token);
            if (decodedToken.role==="admin") {
              setIsAdmin(true);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setIsAdmin(false);
        }
    }
  }, [counter]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [currentTime, setCurrentTime] = useState(new Date());
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.clear();
    Cookies.remove("token");
    dispatch(increase());
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Xóa sessionStorage khi bấm vào Link và chuyển hướng đến URL mục tiêu
  const handleLinkClick = () => {
    sessionStorage.removeItem('index');
    // Thực hiện chuyển hướng đến URL mục tiêu của Link
  };

  return (
    <header className="header">
      <div className="nav__wrapper">
        <div className="logo">
          <img className="h-[2.5rem]" src={Logo} />
          <Link to="/" className="">
            <h1>Smart Farming</h1>
          </Link>
        </div>
        <div className="date-time">
          <ul className="header-ul">
            <li>
              <Link to={"/"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link to={"/plance"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/plance" ? "active" : ""}>Plant</Link>
            </li>
            {isAdmin&&(
              <>
                <li>
                  <Link to={"/attendance"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/attendance" ? "active" : ""}>Attendance</Link>
                </li>
                <li>
                  <Link to={"/device"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/device" ? "active" : ""}>Device</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="nav__icons">
          <span className="n__icon">
            <i class="uil uil-bell"></i>
            <span className="notification">2</span>
          </span>
          {user ? (
            <>
              <span className="navbar-username">Hi, {userName}</span>
              <Link to="/login" className="navbar-logout" onClick={logout}>Log out</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link text-white font-medium">Login</Link>
            </>
          )}
        </div>
        <div className="mobile__menu">
          <span onClick={() => toggleMenu()}>
            <i class={isMenuOpen ? "uil uil-multiply" : "uil uil-bars"}></i>
          </span>
          {isMenuOpen && (
            <div className="mobile-menu">
              {user ? (
                <>
                  <span className="navbar-username text-white font-medium">Hi, {user.username}</span>
                  <Link to="/logout" className="navbar-logout text-white font-medium" onClick={logout}>Log out</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-link text-white font-medium">Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
