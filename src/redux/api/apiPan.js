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
import { Alert } from "../../components/alert/Alert";

export const updateManually = async (id, dispatch, data, navigate, token) => {
  dispatch(updatePanStart());
  try {
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/devices/manually/${id}`,
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
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}api/devices/rgb/${id}`,
      data
    );
    dispatch(updateRGBSuccess(res.data));
    // show thông báo
    Alert(1500, 'Cập nhật RGB', 'Cập nhật RGB thành công!','success', 'OK');
  } catch (err) {
    dispatch(updateRGBFail(err));
    // show thông báo
    Alert(1500, 'Cập nhật RGB', 'Cập nhật RGB thất bại!','error', 'OK');
  }
};
export const deleteDevice = async (id,token) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/devices/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    // show thông báo
    Alert(1500, 'Xóa thiết bị', 'Xóa thiết bị thành công!','success', 'OK');
    return res.data
  } catch (error) {
    // show thông báo
    Alert(1500, 'Xóa thiết bị', 'Xóa thiết bị thất bại!','error', 'OK');
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
    // show thông báo
    Alert(1500, 'Cập nhật thiết bị', 'Cập nhật thiết bị thành công!','success', 'OK');
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // show thông báo
      Alert(1500, 'Thông báo', 'Không có quyền truy cập!','error', 'OK');  
    }
  }
};
