import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from '../authSlice'

import { Alert } from '../../components/alert/Alert';
import { increase } from '../counterSlice';

export const loginUser = async(user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        console.log(process.env.REACT_APP_BACKEND_URL);
        const res  = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/login`, user,
        { withCredentials: true }
        );
        dispatch(loginSuccess(res.data));
        dispatch(increase());
        navigate('/')
    }catch(err){
        dispatch(loginFailed());
    }
};

export const registerUser = async(user, handleCloseSignUpForm, setErrorMessage, setIsLoadding, dispatch, token) => {
    dispatch(registerStart());
    try{
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/register`, user,{
          headers: { authorization: `Bearer ${token}` },
        });
        dispatch(registerSuccess());

        dispatch(increase());

        setIsLoadding(false);
        setErrorMessage('');
        handleCloseSignUpForm();
        //Show thông báo
        Alert(1500, 'Tạo nhân viên', 'Tạo nhân viên thành công!','success', 'OK');
    }catch(err){
      console.log(err);
        dispatch(registerFailed())
        if (err.response?.status === 401 || err.response?.status === 403) {
        //Show thông báo
        Alert(1500, 'Thông báo', 'Bạn không có quyền truy cập!','error', 'OK');
      }
    };
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/user/logout`, id, {
      headers: { token: `${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const getAllEmployee = async (token) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user` , {
          headers: { authorization: `Bearer ${token}` },
        });
      return response.data;
  } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
          const alertBox = document.createElement("div");
          alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
          alertBox.innerHTML = `
              <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                  </svg>
                  <h2 class="text-xl font-semibold mb-2 text-gray-800">Unauthorized</h2>
                  <p class="text-gray-600 text-center">Bạn không có quyền truy cập</p>
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
              </div>
          `;
          document.body.appendChild(alertBox);
          window.removeAlert = function() {
              alertBox.remove();
          };
      }
  }
}
export const getUserById = async (id) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}`);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}
export const deleteUserById = async (id, dispatch, token) => {
  try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/user/delete/${id}`);
      dispatch(increase());
      return response.data;
  } catch (error) {
      //Show thông báo
      Alert(1500, 'Xóa nhân viên', 'Xóa nhân viên thất bại!','error', 'OK');
      console.error(error);
  }
}
export const updateUserRole = async (id, data, dispatch) => {
  try{
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/user/update/${id}`, data);
      dispatch(increase());
      return response.data;
  }catch(error){
    //Show thông báo
    Alert(1500, 'Cập nhật nhân viên', 'Cập nhật thất bại nhân viên thất bại!','error', 'OK');
      console.error(error);
  }
}
