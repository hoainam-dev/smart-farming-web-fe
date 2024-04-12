import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePlant,
  getAllPlant,
  getPlantDetail,
} from "../../redux/api/apiPlants";
import FormUpdatePlant from "../../pages/admin/plant/FormUpdatePlant";
import CollectionPlant from "../collectionPlant/CollectionPlant";
import FormCreatePlant from "../../pages/admin/plant/FormCreatePlant";

import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { Alert, DeleteAlert } from "../alert/Alert";

function Plant() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);

  const counter = useSelector((state) => state.counter?.value);

  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
    } else {
        try {
            const decodedToken = jwt_decode(token);
            if (decodedToken.role==="admin") {
              setIsAdmin(true);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setIsAdmin(false);
        }
    }
  }, [counter]);

  const [isDataPlant, setIsDataPlant] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true); // add loading state
  const [isRegister, setIsRegister] = useState(null);
  const [isTurnPlant, setisTurnPlant] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  useEffect(() => {
    getAllPlant()
      .then((data) => {
        setIsDataPlant(data);
        setLoading(false); // set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // also set loading to false if there's an error
      });
  }, [counter]);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true); // set loading to true before fetching user data
      getPlantDetail(selectedUser)
        .then((data) => {
          setUserData(data);
          setLoading(false); // set loading to false after user data is fetched
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // also set loading to false if there's an error
        });
    }
  }, [selectedUser]);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleEdit = (id) => {
    setIsRegister(id);
  };

  const handleCancel = () => {
    setIsRegister(null);
  };
  
  const handleTurnCollectionOn = (id) => {
    setisTurnPlant(id);
  };

  const handleTurnCollectionCancel = () => {
    setisTurnPlant(null);
  };

  const handleDelete = (id) => {
    DeleteAlert(async()=>{
        try {
            deletePlant(id, dispatch, token);
            //Show thông báo
            Alert(1500, 'Xóa cây trồng', 'Đã xóa cây trồng!','success', 'OK');
          }
        catch (error) {
        //Show thông báo
        Alert(1500, 'Thông báo', 'Có lỗi xảy ra!','error', 'OK');
        }
      }
    );
  };

  const handleLoadingCreatePlant = () => {
    setIsLoadingCreate(true);
  };

  const handleLoadingCancelPlant = () => {
    setIsLoadingCreate(false);
  };

  return (
    <>
      <div class="relative overflow-x-auto mt-[2rem] px-[7rem]">
        <div className="flex gap-5 items-center">
          <select class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
            onChange={handleSelectChange}value={selectedUser}>
            <option value="">Select a user</option> {/* add a default option */}
            {isDataPlant?.plants?.map((data, index) => (
              <option value={data.id} key={index}>
                {data.name}
              </option>
            ))}
          </select>
          {isAdmin && (
            isLoadingCreate ? (
              <button >
                <FormCreatePlant onClose={handleLoadingCancelPlant}/>
              </button>
            ) : (
              <button onClick={handleLoadingCreatePlant} className="bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300">Tạo mới cây trồng</button>
            )
          )}
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">name</th>
              <th scope="col" class="px-6 py-3">location</th>
              <th scope="col" class="px-6 py-3">status</th>
              <th scope="col" class="px-6 py-3">Description</th>
              {isAdmin&&(
                <th scope="col" class="px-6 py-3">action</th>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selectedUser === "" &&
              isDataPlant?.plants?.map((data, index) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data?.name}
                  </th>
                  <td class="px-6 py-4 text-gray-900">{data?.location}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.status}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.description}</td>
                    {isAdmin&&(
                      <td class="px-6 py-4 text-gray-900" key={data.id}>
                      {isRegister === data.id ? (
                        <>
                          <FormUpdatePlant initialData={data} id={data.id} onClose={handleCancel}/>
                          <button onClick={() => handleEdit(data.id)} // Wrap handleEdit in an arrow function
                            className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700">
                            Edit
                          </button>
                        </>
                      ) : (
                        <div className="flex">
                          <button onClick={() => handleEdit(data.id)} className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700">
                            Edit
                          </button>
  
                          <button onClick={() => handleDelete(data?.id)} class="px-4 py-2 mr-2 w-[5rem] text-white bg-red-500 rounded hover:bg-red-700">
                          Delete
                          </button>
                        </div>
                      )}
                      </td>
                    )}
                  <td class="px-6 py-4 text-gray-900">
                    {isTurnPlant === data.id ? (
                      <>
                        <CollectionPlant id={data.id} onClose={handleTurnCollectionCancel}/>
                        <button onClick={() => handleTurnCollectionOn(data.id)} className="font-semibold text-blue-500 hover:text-blue-700">
                          ...
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleTurnCollectionOn(data.id)} className="font-semibold text-blue-500 hover:text-blue-700">
                        ...
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            {selectedUser !== "" && loading ? (
              <tr>
                <td scope="col" colSpan="4" align="center" className="pt-[1rem]">
                  <div className="loadding"></div>
                </td>
              </tr>
            ) : userData?.plant ? (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {userData?.plant?.name}
                </th>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.plant?.location}
                </td>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.plant?.status}
                </td>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.plant?.description}
                </td>

                <td class="px-6 py-4 text-gray-900">
                  <button onClick={() => handleEdit(userData?.user?.id)} class="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(userData?.user?.id)} class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Plant;
