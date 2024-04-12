import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlant } from "../../../redux/api/apiPlants";
import Cookies from "js-cookie";
function FormCreatePlant({ onClose }) {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const token = Cookies.get("token");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createPlant(data, dispatch, onClose, token);
    } catch (error) {
      console.error(error);
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
            <h2 className="text-2xl text-black font-semibold">Tạo cây trồng mới</h2>
            <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
           {/* form start */}
          <div className="bg-white w-full px-6 pt-6 rounded-lg">
          {/* Tên cây trồng */}
            <div className="mb-6 text-start">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-start">
                Tên cây trồng
              </label>
              <input id="name" name="name" type="text" placeholder="Tên cây trồng"
                value={data?.name || ""}
                onChange={handleChange}
                className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Vị trí */}
            <div className="mb-6 text-start">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 text-start">
                Location
              </label>
              <input id="location" name="location" type="text" placeholder="Vị trí"
                value={data?.location || ""}
                onChange={handleChange}
                className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Mô tả */}
            <div className="mb-6 text-start">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 text-start">
                Mô tả
              </label>
              <input id="description" name="description" type="text" placeholder="Mô tả"
                value={data?.description || ""}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/*  Trạng thái */}
            <div className="mb-6 text-start">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 text-start">
                Trạng thái
              </label>
              <input id="status" name="status" type="text" placeholder="Trạng thái"
                value={data?.status || ""}
                onChange={handleChange}
                className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            </div>

            {/* Button submit */}
            <button type="button" onClick={()=>{handleSubmit()}} className="bg-[#47A992] text-white font-semibold py-2 px-4 rounded-md self-center mb-4">
              Tạo cây trồng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCreatePlant;
