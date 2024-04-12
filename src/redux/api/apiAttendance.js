import { Alert } from "../../components/alert/Alert";
import {getDate, getData} from "../attendanceSlice";

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
            //Show thông báo
            Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');
        }
    } catch (err) {
      //Show thông báo
      Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');
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
            //Show thông báo
            Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');
        }
    } catch (err) {
      //Show thông báo
      Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');
    }
};


