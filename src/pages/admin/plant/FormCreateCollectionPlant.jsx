import React, { useState } from "react";
import Cookies from "js-cookie";
import { createPlant, createPlantCollection } from "../../../redux/api/apiPlants";
function FormCreateCollectionPlant({ id, onClose }) {
  const [data, setData] = useState();
  const token = Cookies.get("token");
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPlantCollection(id,data, token);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="h-auto w-[30rem] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-8 flex flex-col justify-between text-black"
      >
        <div className="mb-4">
          <label
            htmlFor="collectionName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Collection Name
          </label>
          <input
            id="collectionName"
            name="collectionName"
            type="text"
            value={data?.collectionName || ""}
            onChange={handleChange}
            className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="proposal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Proposal
          </label>
          <input
            id="proposal"
            name="proposal"
            type="text"
            value={data?.proposal || ""}
            onChange={handleChange}
            className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateChek"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date Checked
          </label>
          <input
            id="dateChek"
            name="dateChek"
            type="date"
            value={data?.dateChek || ""}
            onChange={handleChange}
            className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Diagnostic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Diagnostic
          </label>
          <input
            id="Diagnostic"
            name="Diagnostic"
            type="text"
            value={data?.Diagnostic || ""}
            onChange={handleChange}
            className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md self-center mb-4"
        >
          Create New
        </button>
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default FormCreateCollectionPlant;
