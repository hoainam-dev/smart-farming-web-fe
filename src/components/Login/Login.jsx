import { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../auth/config";
import axios from "axios";
import image from "../../assets/images/pngwing.com.png";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
function Login() {
  const navigate = useNavigate(); // Create a navigate function

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });

      const idToken = await result.user.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/login`,
        { idToken }
      );
      console.log(response);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: response.data.name })
      );
      document.cookie = `token=${idToken}`;
      navigate("/");
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
      } else if (error.code === 'auth/invalid-credential') {
        setError("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
      } else if (error.response && error.response.status === 400) {
        setError("Yêu cầu không hợp lệ. Vui lòng thử lại sau.");
      } else if(error.code === 'auth/too-many-requests') {
        setError("Quá nhiều yêu cầu từ thiết bị này. Vui lòng thử lại sau.");
      }else if(error.code === 'auth/network-request-failed') {
        setError("Lỗi kết nối. Vui lòng kiểm tra lại đường truyền.");
      }else if(error.code === 'auth/invalid-email') {
        setError("Email không hợp lệ. Vui lòng kiểm tra lại.");
      }
      else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[50rem] flex bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex-none mt-20">
          <img
            src={image}
            alt="Login illustration"
            className="w-full h-auto max-w-[400px] object-cover"
          />
        </div>
        <div className="flex-grow flex flex-col justify-center p-8 bg-[#47A992]">
          <div className="login-container">
            <h2 className="login-title text-3xl font-semibold mb-6 text-gray-800 ">
              Log in
            </h2>
            {error && (
              <div className="error-message mb-6 text-red-500">{error}</div>
            )}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="formUsername  bg-white"
                  className="block mb-2 text-gray-800"
                >
                  Username
                </label>
                <input
                  id="formUsername"
                  type="text"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control-login py-3 px-4 border  bg-white border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500 text-gray-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="formPassword"
                  className="block mb-2 text-gray-800"
                >
                  Password
                </label>
                <input
                  id="formPassword"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control-login py-3 px-4 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500 text-gray-800"
                  minLength={6} // Add minLength attribute to enforce 6 character password
                  required
                />
              </div>
              <button
                type="submit"
                className="login-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
              >
                Continue
              </button>
            </form>
            <div className="login-register mt-6 text-gray-800">
              Don't have an account yet?
            </div>
            <div className="login-register mt-6 text-gray-800 flex justify-center">
              <div className="bg-white rounded-full p-[0.5rem]">
                <AiFillGooglePlusCircle className="text-[#DB4437] text-2xl cursor-pointer hover:text-red-600" />
              </div>
              <div className="bg-white rounded-full p-[0.5rem] mx-4">
                <AiFillGithub className="text-[#211F1F] text-2xl cursor-pointer hover:text-gray-900" />
              </div>
              <div className="bg-white rounded-full p-[0.5rem]">
                <BsFacebook className="text-[#3EBBFF] text-2xl cursor-pointer hover:text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
