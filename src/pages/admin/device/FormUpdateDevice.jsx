import React, { useState } from "react";
import Cookies from "js-cookie";
import { getPans, updateDevice } from "../../../redux/api/apiPan";
import { Alert } from "../../../components/alert/Alert";
import { useDispatch } from "react-redux";

function FormUpdateDevice({ id, initialData, onClose }) {
  const [data, setData] = useState(initialData);
  const token = Cookies.get("token");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateDevice(id, data, token);
      getPans(dispatch, token);
      onClose();
    } catch (error) {
      Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');  
    }
  };

  return (
    <div className="fixed inset-0  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="flex justify-center items-center h-[100%] w-[100%]">
        {/* frame */}
        <div className="bg-white w-[30%] rounded-xl py-5">
          {/* title start */}
          <div className="flex justify-between items-center px-5">
            <div></div>
            <h2 className="text-2xl text-black font-semibold">Cập nhật thiết bị</h2>
            <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
           {/* form start */}
          <div className="bg-white w-full px-6 pt-6 rounded-lg">
            {/* Tên thiết bị */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên thiết bị
              </label>
              <input id="name" name="name" type="text" placeholder="Tên thiết bị"
                value={data.name}
                onChange={handleChange}
                className="mt-1  text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>
            {/* Topic */}
            <div className="mb-6">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700  mb-1">
                Topic
              </label>
              <input id="topic" name="topic" type="text" placeholder="Topic"
                value={data.topic}
                onChange={handleChange}
                className="mt-1  text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* Control */}
            <div className="mb-6">
              <label htmlFor="control" className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái điều khiển
              </label>
              <select id="control" name="control"
                value={data.control}
                onChange={handleChange}
                className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="physical">Physical</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            {/* Status */}
            <div className="mb-6">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select id="status" name="status"
                value={data.status}
                onChange={handleChange}
                className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
            </div>
            {/* Button submit */}
            <button type="button" onClick={()=>{handleSubmit()}} className="bg-[#47A992] text-white font-semibold py-2 px-4 rounded-md self-center mb-4">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateDevice;
