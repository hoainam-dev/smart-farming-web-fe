import React, { useEffect, useState } from "react";
import { getAllDataCollectionByIdPlant } from "../../../redux/api/apiPlants";

function DetailCollectionPlant({ id, query }) {
  const [isdata, setIsData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDataCollectionByIdPlant(id, query);
      setIsData(response);
    };
    fetchData();
  }, [id, query]);
  return (
    <div className="fixed top-1/2 transform -translate-y-1/2 left-[60%] bg-white rounded-md shadow-lg p-8 max-w-md transition duration-300 ease-in-out  hover:scale-105 hover:shadow-xl">
      {isdata?.checkIllness?.map((item) => {
        if (query === "Check bệnh") {
          return (
            <div key={item.id} className="mb-5">
              <p className="text-black font-bold">Chuẩn đoán: {item["Chuẩn đoán"]}</p>
              <p className="text-black font-bold">Đề suất: {item["Đề suất"]}</p>
              <p className="text-black font-bold">Ngày check: {item["Ngày check"]._seconds}</p>
              <button  className="bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-10">Tao Mới</button>
            </div>
          );
        } else if (query === "cropActivity") {
          return (
            <div key={item.id} className="bg-gray-200 rounded-md p-4 mb-4">
              <p className="text-black font-bold">{item.nameActivity}</p>
              <p className="text-black">{item.description}</p>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
  

}

export default DetailCollectionPlant;
