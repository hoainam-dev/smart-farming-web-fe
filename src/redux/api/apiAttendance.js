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
