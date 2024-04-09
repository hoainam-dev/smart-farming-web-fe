import React, { useState } from "react";
import { postDevice } from "../../../redux/api/apiDevice";
import Cookies from "js-cookie";

function Device() {
  const [formData, setFormData] = useState({
    name: "",
    status: "OFF",
    topic: "",
  });

  const cookie = Cookies.get("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDevice(formData, cookie);

      setFormData({
        name: "",
        status: "OFF",
        topic: "",
      });
    } catch (error) {
      console.error("Error adding device:", error);
    
    }
  };

  return (
    <div className="container mx-auto mt-8 pt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Fan Device</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-lg font-semibold mb-2">
            Topic:
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Add Device
        </button>
      </form>
    </div>
  );
}

export default Device;
