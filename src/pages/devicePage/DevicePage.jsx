import React, { useEffect, useState } from "react";
import {
  deletePlant,
  getPlantDetail,
} from "../../redux/api/apiPlants";
import FormUpdatePlant from "../admin/plant/FormUpdatePlant";
import CollectionPlant from "../../components/collectionPlant/CollectionPlant";
import { useSelector } from "react-redux";
import { deleteDevice, getPans } from "../../redux/api/apiPan";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie'
import FormCreateDevice from "../admin/device/FormCreateDevice";
import FormUpdateDevice from "../admin/device/FormUpdateDevice";
function DevicePage() {
  const [isDataPlant, setIsDataPlant] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true); // add loading state
  const [isRegister, setIsRegister] = useState(null);
  const [isTurnPlant, setisTurnPlant] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const deviceList = useSelector((state) => state.pans.pans?.pan?.devices);
    const dispatch = useDispatch();
    const cookie = Cookies.get('token')
  useEffect(() => {
    getPans(dispatch,cookie);

  }, []);

 

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
  const handleDelete = async(id) => {
    await deleteDevice(id,cookie);
    await getPans(dispatch,cookie);

  };
  const handleLoadingCreate = () => {
    setIsLoadingCreate(true);
  };
  const handleLoadingCancel= () => {
    setIsLoadingCreate(false);
  };
  return (
    <>
      <div class="relative overflow-x-auto mt-[2rem] px-[7rem] pt-20">
        <div className="flex gap-5 items-center">
          <select
            class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
            onChange={handleSelectChange}
            value={selectedUser}
          >
            <option value="">Select a user</option> {/* add a default option */}
            {deviceList?.map((data, index) => (
              <option value={data.id} key={index}>
                {data.name}
              </option>
            ))}
          </select>
          {isLoadingCreate ? (
            <button>
              <FormCreateDevice onClose={handleLoadingCancel} />
            </button>
          ) : (
            <button
              onClick={handleLoadingCreate}
              className=" bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Tạo mới Thiết bị
            </button>
          )}
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                name
              </th>

              <th scope="col" class="px-6 py-3">
              control
              </th>
              <th scope="col" class="px-6 py-3">
              topic
              </th>
              <th scope="col" class="px-6 py-3">
                action
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {selectedUser === "" &&
              deviceList.map((data, index) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.name}
                  </th>
                  <td class="px-6 py-4 text-gray-900">{data?.control}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.topic}</td>
                  <td class="px-6 py-4 text-gray-900" key={data.id}>
                    {isRegister === data.id ? (
                      <>
                        <FormUpdateDevice
                          initialData={data}
                          id={data.id}
                          onClose={handleCancel}
                        />
                        <button
                          onClick={() => handleEdit(data.id)} // Wrap handleEdit in an arrow function
                          className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(data.id)} // Wrap handleEdit in an arrow function
                        className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(data?.id)}
                      class="px-4 py-2 mr-2 w-[5rem] text-white bg-red-500 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                 
                </tr>
              ))}
            {selectedUser !== "" && loading ? (
              <tr>
                <td
                  scope="col"
                  colSpan="4"
                  align="center"
                  className="pt-[1rem]"
                >
                  <div className="loadding"></div>
                </td>
              </tr>
            ) : userData?.plant ? (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
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
                  <button
                    onClick={() => handleEdit(userData?.user?.id)}
                    class="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(userData?.user?.id)}
                    class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                  >
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

export default DevicePage;
