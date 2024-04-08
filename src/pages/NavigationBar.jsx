import { useSelector } from "react-redux";
import Login from "../components/Login/Login";
import Home from "./home/Home";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
function NavigationBar() {
  const token = Cookies.get("token");
  if(!token) {
    return <Login />;
  }
  const tokenObject = JSON.parse(token);

  const decodedToken = jwt_decode(tokenObject?.token); 
  const user_id = decodedToken.user_id; 
  if (!user_id) {
    return <Login />;
  } else {
    return <Home />;
  }
}
export default NavigationBar;
