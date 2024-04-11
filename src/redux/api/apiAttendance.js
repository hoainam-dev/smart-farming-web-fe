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