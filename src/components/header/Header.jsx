import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/api/apiUser";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import Cookies from "js-cookie";

import Logo from "../../assets/images/logo.png";

import "./header.css";

function Header(props) {
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
          {/* <img src={logo} alt="" /> */}
          <img className="h-[2.5rem]" src={Logo} />
          <Link to="/" className="">
            <h1>Smart Farming</h1>
            {/* <p>Since 1989</p> */}
          </Link>
        </div>
        <div className="date-time">
          {/* {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })} */}
          <ul className="header-ul">
            <li>
              <Link to={"/"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link to={"/plance"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/plance" ? "active" : ""}>Plance</Link>
            </li>
            <li>
              <Link to={"/attendance"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/attendance" ? "active" : ""}>Attendance</Link>
            </li>
            <li>
              <Link to={"/device"} onClick={()=>{handleLinkClick()}} className={window.location.pathname === "/device" ? "active" : ""}>Device</Link>
            </li>
          </ul>
        </div>
        <div className="nav__icons">
          <span className="n__icon">
            <i class="uil uil-bell"></i>
            <span className="notification"> 2</span>
          </span>
          {user ? (
            <>
              <span className="navbar-username">Hi, {userName}</span>
              <Link to="/login" className="navbar-logout" onClick={logout}>
                Log out
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link text-red-500">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
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
                  <span className="navbar-username">Hi, {user.username}</span>

                  <Link to="/logout" className="navbar-logout" onClick={logout}>
                    Log out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-link">
                    Login
                  </Link>
                  <Link to="/register" className="navbar-link">
                    Register
                  </Link>
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
