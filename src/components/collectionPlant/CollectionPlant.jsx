import React, { useEffect, useState } from "react";
import { getAllCollectionByIdPlant } from "../../redux/api/apiPlants";
import DetailCollectionPlant from "./detailCollectionPlant.jsx/DetailCollectionPlant";
import FormCreateCollectionPlant from "../../pages/admin/plant/FormCreateCollectionPlant";

function CollectionPlant({ id, onClose }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCollectionByIdPlant(id);
      setData(response);
    };
    fetchData();
  }, [id]);
  const handeCheck = (id) => {
    setLoading(id);
  };
  const handleCancel = (id) => {
    setLoading(null);
  };
  const handleLoadingCreateCollection = () => {
    setIsLoadingCreate(true);
  };
  const handleLoadingCancelCollection = () => {
    setIsLoadingCreate(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md relative">
        <div className="p-8">
          {data?.collections?.map((item) =>
            loading === item ? (
              <div key={item} className="mb-6">
                <h1 className="text-red-500 text-xl font-bold mb-4">{item}</h1>
                <div className="ml-8">
                  <DetailCollectionPlant id={id} query={item} />
                </div>
              </div>
            ) : (
              <div key={item} className="mb-6">
                <button
                  className="bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300 block"
                  onClick={() => handeCheck(item)}
                >
                  {item}
                </button>
              </div>
            )
          )}
        </div>
        {
          isLoadingCreate ? (
            <FormCreateCollectionPlant onClose={handleLoadingCancelCollection} id={id}/>
          ): (
            <button onClick={ handleLoadingCreateCollection} className="bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ml-12 mb-2 mr-10">Tạo Mới</button>

          )
        }
        <button
          type="button"
          className="absolute top-3 right-3 text-black hover:text-gray-700 hover:focus:outline-none hover:transition hover:duration-300 hover:bg-slate-500 hover:rounded-md hover:shadow-md hover:cursor-pointer"
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
      </div>
    </div>
  );
  
}

export default CollectionPlant;
