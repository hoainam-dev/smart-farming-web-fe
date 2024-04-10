import {getDate, getData} from "../attendanceSlice"
import axios from "axios";
export const getAllAttendance = () => async (dispatch) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
            };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/attendance`, requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            dispatch(getDate(responseData.attendances))
        }else{
            console.log("Có lỗi xảy ra!");
        }
    } catch (err) {
      console.log("Có lỗi xảy ra!");
    }
};

export const getAttendanceFromDay = ( day, setLoadding ) => async (dispatch) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
            };
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/attendance/collection/${day}`, requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            dispatch(getData(responseData.data));
            setLoadding(false);
        }else{
            console.log("Có lỗi xảy ra!");
        }
    } catch (err) {
      console.log("Có lỗi xảy ra!");
    }
};
export const getAllEmployee = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/user`);
        return response.data;
    } catch (error) {
        console.error(error);
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
export const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/user/delete/${id}`);
        return response.data;
    } catch (error) {
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