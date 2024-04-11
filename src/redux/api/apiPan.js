import axios from "axios";
import {
  getPanFail,
  getPanStart,
  getPanSuccess,
  updatePanFail,
  updatePanStart,
  updatePanSuccess,
  updateRGBFail,
  updateRGBStart,
  updateRGBSuccess,
} from "../panSice";

export const updateManually = async (id, dispatch, data, navigate, token) => {
  dispatch(updatePanStart());
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/manually/${id}`,
      data,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    dispatch(updatePanSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(updatePanFail(error));
  }
};
export const getPans = async (dispatch, token) => {
  dispatch(getPanStart());
  try {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/devices`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    dispatch(getPanSuccess(res.data));
  } catch (error) {
    dispatch(getPanFail(error));
  
  }
};
export const updateRGB = async (dispatch, id, data) => {
  dispatch(updateRGBStart());
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/rgb/${id}`,
      data
    );
    dispatch(updateRGBSuccess(res.data));
  } catch (err) {
    dispatch(updateRGBFail(err));
  }
};
export const deleteDevice = async (id,token) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return res.data
  } catch (error) {
    console.log(error.message);
  }
};
export const updateDevice = async (id,data, token) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/update/${id}`,data,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const alertBox = document.createElement("div");
      alertBox.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "w-full",
        "h-full",
        "flex",
        "justify-center",
        "items-center",
        "bg-gray-800",
        "bg-opacity-50",
        "z-50"
      );
      alertBox.innerHTML = `
          <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
              </svg>
              <h2 class="text-xl font-semibold mb-2 text-gray-800">Unauthorized</h2>
              <p class="text-gray-600 text-center">Bạn không có quyền cập nhật</p>
              <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
          </div>
      `;
      document.body.appendChild(alertBox);
      window.removeAlert = function () {
        alertBox.remove();
      };
 
    }
  }
};
