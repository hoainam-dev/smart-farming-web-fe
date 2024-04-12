import React, { useState } from 'react';
import { registerUser } from '../../../redux/api/apiUser';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import "./loading.css";

const SignUpForm = ({ handleCloseSignUpForm, userLenght, setFaceId }) => {
  const dispatch = useDispatch();

  const token = Cookies.get('token');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isRecognition: false,
    faceId: userLenght,
    isAdmin: 0,
    isRole: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isloadding, setIsLoadding] = useState(false);
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if (name === "isAdmin") {
      updatedValue = parseInt(value, 10);
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
      isRole: updatedValue === 1 ? 'admin' : 'user'
    });
  };

  const handleSubmit = () => {
    try {
      if (formData.firstName==="" || !formData.firstName ||
          formData.lastName==="" || !formData.lastName ||
          formData.email==="" || !formData.email ||
          formData.password==="" || !formData.password ||
          confirmPassword==="" || !confirmPassword) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin!");
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrorMessage("Email không hợp lệ!");
      }else if(formData.password.length<6){
        setErrorMessage('Mật khẩu phải lớn hơn 6 ký tự!')
      }else if(formData.password!==confirmPassword){
        setErrorMessage("Mật khẩu không khớp!");
      }else{
        setIsLoadding(true);
        registerUser(formData, handleCloseSignUpForm , setErrorMessage, setIsLoadding, setFaceId, dispatch, token);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-auto">
      {/* close modal when click out of modal area */}
      <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={handleCloseSignUpForm}></div>
      {/* header area start */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-16 z-50 max-[2700px]:max-w-[37%] max-[1440px]:max-w-[50%] max-[1100px]:max-w-[53%] max-[970px]:max-w-[57%] max-[470px]:max-w-[70%] w-full h-[86%]">
        <div className="flex items-center gap-24 h-[3.5rem] font-bold rounded-t-lg w-full pb-2 pt-2 px-10">
          {/* close modal button */}
          <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseSignUpForm}>
            <svg xmlns="http://www.w3.org/2000/svg" height="" width="15" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <h2 className="text-2xl text-black font-semibold">Tạo nhân viên mới</h2>
        </div>
        {/* header area end */}

        <hr />
        {/* body area start */}
        <div className="px-10 py-4 overflow-auto max-h-[88%] max-h-[200px]:max-h-[30%] z-50">
          {/* error message */}
          {errorMessage!=='' ? (
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-3 rounded-xl flex justify-between" role="alert">
                <span class="block sm:inline">{errorMessage}</span>
                <button onClick={()=>{setErrorMessage('')}} className=''>x</button>
            </div>
          ): <div className='h-[3.35rem] text-lg font-medium text-black'>Tạo tài khoản cho nhân viên để sử dụng website!</div>}

          {/* form start */}
            {/* full name */}
            <div className="flex justify-between w-full">
                {/* firstName */}
                <div className="w-[45%]">
                    <label htmlFor="firstName" className="block text-gray-800 font-medium mb-1">Họ<span className="text-red-500"> (*)</span></label>
                    <input className="bg-gray-200 border-none rounded-2xl text-black px-[1.4rem] py-2 my-2 w-full" type="text" id="firstName" name="firstName"
                      value={formData.firstName} 
                      onChange={handleChange}/>
                </div>
                {/* lastName */}
                <div className="w-[45%]">
                    <label htmlFor="lastName" className="block text-gray-800 font-medium mb-1">Tên<span className="text-red-500"> (*)</span></label>
                    <input className="bg-gray-200 border-none rounded-2xl text-black px-[1.4rem] py-2 my-2 w-full" type="text" id="lastName" name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}/>
                </div>
            </div>

            {/* Email */}
            <div className="">
                <label className="block text-gray-800 font-medium mb-1">Email<span className="text-red-500"> (*)</span></label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} 
                className="bg-gray-200 border-none rounded-2xl text-gray-700 px-[1.4rem] py-2 my-2 w-full"/>
            </div>

            {/* password */}
            <div className="">
                <label htmlFor="password" className="block text-gray-800 font-medium mb-1">Mật khẩu<span className="text-red-500"> (*)</span></label>
                <div className="relative">
                    <input type={isPasswordVisible ? "text" : "password"}
                    className="bg-gray-200 border-none rounded-2xl text-gray-700 px-[1.4rem] py-2 my-2 w-full"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}/>
                    {/* button show or hide password */}
                    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{togglePasswordVisibility(0)}}>
                        {isPasswordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* confirm password */}
            <div className="">
                <label htmlFor="password" className="block text-gray-800 font-medium mb-1">Nhập lại mật khẩu<span className="text-red-500"> (*)</span></label>
                <div className="relative">
                    <input type={isConfirmPasswordVisible ? "text" : "password"}
                    className="bg-gray-200 border-none rounded-2xl text-gray-700 px-[1.4rem] py-2 my-2 w-full"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                    {/* button show or hide password */}
                    <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600" onClick={()=>{toggleConfirmPasswordVisibility(0)}}>
                        {isConfirmPasswordVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" height="14" width="17.5" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
                        )}
                    </button>
                </div>
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-800 mb-1">Role<span className="text-red-500"> (*)</span></label>
              <div className="flex items-center">
                {/* admin option */}
                <input type="radio" id="admin" name="isAdmin" className="mr-2 bg-gray-200"
                  value={1}
                  checked={formData.isAdmin === 1}
                  onChange={handleChange}/>
                <label htmlFor="admin" className="mr-4 text-black">Admin</label>
                {/* user option */}
                <input type="radio" id="user" name="isAdmin" className="mr-2 bg-gray-200"
                  value={0}
                  checked={formData.isAdmin === 0}
                  onChange={handleChange}/>
                <label htmlFor="user" className='text-black'>User</label>
              </div>
            </div>

            {/* button register */}
            <button type="button" 
              className="flex items-center justify-center gap-3 bg-[#47A992] hover:bg-[#47A992] transition duration-1000 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              onClick={()=>{handleSubmit()}}>
                {isloadding ? (
                  <div className='loading'></div>
                ): "Tạo nhân viên"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
