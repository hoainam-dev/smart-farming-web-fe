import axios from "axios";
export const postDevice = async (data, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/devices/create`,
      data,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    alert("Tạo device thành công");
  } catch (error) {
    if (error.response && error.response.status === 403) {
        alert("Bạn không có quyền tạo");
      } else {
        alert("vui lòng tạo lại thiết bị");
      }
  }
};
