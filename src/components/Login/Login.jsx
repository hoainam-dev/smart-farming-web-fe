import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { Alert } from "../alert/Alert";
import Image from "../../assets/images/background.jpg";
import { increase } from "../../redux/counterSlice";
import { auth } from "../../auth/config";

function Login() {
  const navigate = useNavigate(); // Create a navigate function
  const dispatch = useDispatch(); // Create a Dispatch function

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const clearMessage = () => {
    setError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });

      const idToken = await result.user.getIdToken();
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/login`, { idToken });
      localStorage.setItem(
        "user",
        JSON.stringify({ name: response.data.name })
      );
      document.cookie = `token=${idToken}`;

      dispatch(increase());

      navigate("/");
      //Show thông báo
      Alert(1500, 'Đăng nhập', 'Đăng nhập thành công!','success', 'OK');
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
    <>
      <div className="text-[#333]">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
          <div className="flex items-center mt-[5rem] bg-[#F5FDFB] gap-5 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <div className="mb-3">
                <h3 className="text-3xl font-extrabold">Đăng nhập</h3>
              </div>
              {/* error message */}
              {!error=='' ? (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-2 rounded-xl flex justify-between" role="alert">
                    <span class="block sm:inline">{error}</span>
                    <button onClick={()=>{setError('')}} className=''>x</button>
                </div>
              ): <div className="h-[3.1rem] text-xl font-medium">Chào mừng đến với SmartFarming</div>}
              {/* Email */}
              <div>
                <label className="text-md font-medium block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="text" required onChange={(e) => {setEmail(e.target.value);clearMessage();}}
                  className="w-full text-md border-2-black focus:border-[#333] px-4 py-2 rounded-lg" 
                  placeholder="Enter email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667"><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" data-original="#000000"></path></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)"><path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path><path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path></g></svg>
                </div>
              </div>
              {/* Password */}
              <div className="mt-8">
                <label className="text-md font-medium block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type={isPasswordVisible?"text":"password"} required onChange={(e) => {setPassword(e.target.value);clearMessage();}}
                  className="w-full text-md border-2-black focus:border-[#333] px-4 py-2 rounded-lg" placeholder="Enter password" />
                  <button onClick={()=>{togglePasswordVisibility()}}>
                    {isPasswordVisible ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-[18px] h-[18px] absolute right-4 top-3 cursor-pointer" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-[20px] h-[20px] absolute right-4 top-3 cursor-pointer" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                      )}
                  </button>
                </div>
              </div>
              {/* Remember me */}
              <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 border-gray-300 rounded" />
                  <label for="remember-me" className="ml-3 block text-sm">Remember me</label>
                </div>
                {/* Forgot Password? */}
                <div>
                  <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">Forgot Password?</a>
                </div>
              </div>
              {/* button sign in */}
              <div className="mt-6">
                <button onClick={handleSubmit} type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#09334b] hover:bg-[#47A992] focus:outline-none">Đăng nhập</button>
              </div>

              {/* Button google, apple, facebook */}
              <p className="my-6 text-sm text-gray-400 text-center">or continue with</p>
              <div className="space-x-8 flex justify-center">
                <button type="button" className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512"><path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" data-original="#fbbd00" />
                    <path fill="#0f9d58"d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"data-original="#0f9d58" />
                    <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" data-original="#31aa52" />
                    <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" data-original="#3c79e6" />
                    <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" data-original="#cf2d48" />
                    <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" data-original="#eb4132" />
                  </svg>
                </button>
                <button type="button" className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#000" viewBox="0 0 22.773 22.773">
                    <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" data-original="#000000"></path>
                  </svg>
                </button>
                <button type="button" className="border-none outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
                    <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* right image */}
            <div className="h-full max-md:mt-10">
              <img src={Image} className="max-w-full h-[30rem] object-cover rounded-lg" alt="login-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
