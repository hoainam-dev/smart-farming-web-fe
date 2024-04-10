import React, { useEffect, useState } from "react";
import {
  deleteUserById,
  getAllEmployee,
  getUserById,
} from "../../redux/api/apiAttendance";
import EditUserRoleForm from "../../pages/admin/user/EditUserRoleForm";

function EmployeeList() {
  const [isDataUser, setIsDataUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true); // add loading state
  const [isRegister, setIsRegister] = useState(null);

  console.log(selectedUser);
  useEffect(() => {
    getAllEmployee()
      .then((data) => {
        setIsDataUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true); 
      getUserById(selectedUser)
        .then((data) => {
          setUserData(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); 
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
  const handleDelete = (id) => {
    deleteUserById(id);
  };
  return (
    <>
      <div class="relative overflow-x-auto mt-[2rem] px-[7rem]">
        <div className="flex gap-5 items-center">
          <select
            class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
            onChange={handleSelectChange}
            value={selectedUser}
          >
            <option value="">Select a user</option> {/* add a default option */}
            {isDataUser?.users?.map((data, index) => (
              <option value={data.id} key={index}>
                {data.email}
              </option>
            ))}
          </select>
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                email
              </th>

              <th scope="col" class="px-6 py-3">
                firstName
              </th>
              <th scope="col" class="px-6 py-3">
                lastName
              </th>
              <th scope="col" class="px-6 py-3">
                isRole
              </th>
              <th scope="col" class="px-6 py-3">
                faceId
              </th>
              <th scope="col" class="px-6 py-3">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedUser === "" &&
              isDataUser?.users?.map((data, index) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.email}
                  </th>
                  <td class="px-6 py-4 text-gray-900">{data?.firstName}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.lastName}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.isRole}</td>
                  <td class="px-6 py-4 text-gray-900">
                    {data?.faceId}
                  </td>
                  <td class="px-6 py-4 text-gray-900" key={data.id}>
                    {isRegister === data.id ? (
                      <>
                        <EditUserRoleForm initialData={data} id={data.id} onClose={handleCancel} />
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(data.id)} // Wrap handleEdit in an arrow function
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(data?.id)}
                      class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
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
            ) : userData?.user ? (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {userData?.user?.email}
                </th>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.user?.fistName}
                </td>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.user?.lastName}
                </td>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.user?.isRole}
                </td>
                <td class="px-6 py-4 text-gray-900">
                  {userData?.user?.faceId === false
                    ? "Chưa nhận dạng khuôn mặt"
                    : "Đã nhận dạng khuôn mặt"
                    ? ""
                    : ""}
                </td>
                <td class="px-6 py-4 text-gray-900">
                {isRegister === userData?.user?.id ? (
                      <>
                        <EditUserRoleForm initialData={userData.user} id={userData?.user.id} onClose={handleCancel} />
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(userData?.user.id)} // Wrap handleEdit in an arrow function
                        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    )}
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

export default EmployeeList;
