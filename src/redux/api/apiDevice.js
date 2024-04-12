import axios from "axios";
import { Alert } from "../../components/alert/Alert";
export const postDevice = async (data, token) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/create`,
      data,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    //Show thông báo
    Alert(1500, 'Tạo thiết bị', 'Tạo thiết bị thành công!','success', 'OK');
  } catch (error) {
    if (error.response && error.response.status === 403) {
        //Show thông báo
        Alert(1500, 'Thông báo', 'Bạn không có quyền tạo!','error', 'OK');
      } else {
        //Show thông báo
        Alert(1500, 'Thông báo', 'vui lòng tạo lại thiết bị!','warning', 'OK');
      }
  }
};
