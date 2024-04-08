import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/api/apiUser";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import Cookies from "js-cookie";

import Logo from "../../assets/images/logo.png";

import "./header.css";
// import { Container, Row } from "react-bootstrap";
// import { Container, Row } from "reactstrap";
function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [currentTime, setCurrentTime] = useState(new Date());
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const handleLogout = () => {
  //   logOut(dispatch, id, navigate, accessToken, axiosJWT);
  //   // console.log(user);
  // };
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
  return (
    <header className="header">
      <div className="nav__wrapper">
        <div className="logo">
          {/* <img src={logo} alt="" /> */}
          <img className="h-[2.5rem]" src={Logo}/>
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
          <ul>
            <li>
              <Link to={"/"}>Device</Link>
            </li>
            <li>
              <Link to={"/plance"}>Plance</Link>
            </li>
            <li>
              <Link to={"/attendance"}>Attendance</Link>
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
              <Link
                to="/login"
                className="navbar-logout"
                onClick={logout}
              >
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
                  <span className="navbar-username">
                    Hi, {user.username}
                  </span>

                  <Link
                    to="/logout"
                    className="navbar-logout"
                    onClick={logout}
                  >
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
