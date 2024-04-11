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
export const registerUser = async(user, handleCloseSignUpForm, setErrorMessage, setIsLoadding, dispatch) => {
    dispatch(registerStart());
    try{
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/register`, user);
        dispatch(registerSuccess());

        dispatch(increase());

        setIsLoadding(false);
        setErrorMessage('');
        handleCloseSignUpForm();
        //Show thông báo
        Alert(1500, 'Tạo nhân viên', 'Tạo nhân viên thành công!','success', 'OK');
    }catch(err){
        dispatch(registerFailed());
        setIsLoadding(false);
        setErrorMessage('Có lỗi xảy ra');
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

export const getUserById = async (id) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user/${id}`);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}
export const deleteUserById = async(id, dispatch) => {
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
export const updateUserRole = async (id, data) => {
    try{
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/user/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error(error);
    }
}
export const getAllEmployee = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
