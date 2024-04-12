import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPlant, updatePlant } from "../../../redux/api/apiPlants";
import Cookies from "js-cookie";
import { Alert } from "../../../components/alert/Alert";
function FormUpdatePlant({ id, initialData, onClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState(initialData);
  const token = Cookies.get("token");
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updatePlant(id, data, dispatch, onClose, token);
    } catch (error) {
      //Show thông báo
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
            <h2 className="text-2xl text-black font-semibold">Cập nhật cây trồng</h2>
            <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
           {/* form start */}
          <div className="bg-white w-full px-6 pt-6 rounded-lg">
            {/* Tên cây trồng */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input id="name" name="name" type="text" placeholder="Tên cây trồng"
                value={data.name}
                onChange={handleChange}
                className="mt-1  text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Vị trí cây trồn */}
            <div className="mb-6">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input id="location" name="location" type="text" placeholder="Vị trí cây trồng"
                value={data.location}
                onChange={handleChange}
                className="mt-1  text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Mô tả */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input id="description" name="description" type="text" placeholder="Mô tả"
                value={data.description}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Trạng thái */}
            <div className="mb-6">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <input id="status" name="status" type="text" placeholder="Trạng thái"
                value={data.status}
                onChange={handleChange}
                className="mt-1  text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* button submit */}
            <button type="button" onClick={()=>{handleSubmit()}} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md self-center mb-4">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdatePlant;
