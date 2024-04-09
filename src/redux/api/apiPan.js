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
  } catch (err) {
    dispatch(updatePanFail(err));
  }
};
export const getPans = async (dispatch) => {
  dispatch(getPanStart());
  try {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/devices`
    );
    dispatch(getPanSuccess(res.data));
  } catch (err) {
    dispatch(getPanFail(err));
  }
};
export const updateRGB = async (dispatch, id, data) => {
  dispatch(updateRGBStart());
  try {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/rgb/${id}`,
      data
    );
    dispatch(updateRGBSuccess(res.data));
  } catch (err) {
    dispatch(updateRGBFail(err));
  }
};
