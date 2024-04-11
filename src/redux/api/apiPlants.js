import axios from 'axios';
export const getAllPlant = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/plants`); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const getPlantDetail = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/plants/${id}`); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const updatePlant = async (id, data,token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/update/${id}`, data,  {
            headers: { authorization: `Bearer ${token}` },
          }); 
          if(res.status === 201) {
            const alertBox = document.createElement("div");
            alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
            alertBox.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">Success</h2>
                    <p class="text-gray-600 text-center">Thông tin cây đã được cập nhật thành công.</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                </div>
            `;
            document.body.appendChild(alertBox);
            window.removeAlert = function() {
                alertBox.remove();
            };
        }
        return res.data;
    } catch (error) {

            if (error.response.status === 401 || error.response.status === 403) {
                const alertBox = document.createElement("div");
                alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
                alertBox.innerHTML = `
                    <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                        </svg>
                        <h2 class="text-xl font-semibold mb-2 text-gray-800">Unauthorized</h2>
                        <p class="text-gray-600 text-center">Bạn không có quyền cập nhật thông tin cây này.</p>
                        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                    </div>
                `;
                document.body.appendChild(alertBox);
                window.removeAlert = function() {
                    alertBox.remove();
                };
            }

            console.log(error);

        
    }
}
export const deletePlant = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/plants/delete/${id}`); 
        if (res.status === 201) {
            const alertBox = document.createElement("div");
            alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
            alertBox.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">Success</h2>
                    <p class="text-gray-600 text-center">Thông tin cây đã được xóa thành công.</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                </div>
            `;
            document.body.appendChild(alertBox);
            window.removeAlert = function () {
                alertBox.remove();
            };
        }
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllCollectionByIdPlant = async (id) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/plants/getAllCollection/${id}`); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const getAllDataCollectionByIdPlant = async (id,query) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/plants/getCollection/${id}?collectionName=${query}`); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const createPlant = async (data,token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/create`, data,  {
            headers: { authorization: `Bearer ${token}` },
          }); 
          if(res.status === 201) {
            const alertBox = document.createElement("div");
            alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
            alertBox.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">Success</h2>
                    <p class="text-gray-600 text-center">Tạo mới thành công</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                </div>
            `;
            document.body.appendChild(alertBox);
            window.removeAlert = function() {
                alertBox.remove();
            };
        }
        return res.data;
    } catch (error) {
            if ( error.response.status === 401 || error.response.status === 403) {
                const alertBox = document.createElement("div");
                alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
                alertBox.innerHTML = `
                    <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                        </svg>
                        <h2 class="text-xl font-semibold mb-2 text-gray-800">Unauthorized</h2>
                        <p class="text-gray-600 text-center">Bạn không có quyền truy cập</p>
                        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                    </div>
                `;
                document.body.appendChild(alertBox);
                window.removeAlert = function() {
                    alertBox.remove();
                };
            }
            console.log(error);
        
        
    }
}
export const createPlantCollection = async (id,data,token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/createCollection/${id}`, data,  {
            headers: { authorization: `Bearer ${token}` },
          }); 
          if(res.status === 201) {
            const alertBox = document.createElement("div");
            alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
            alertBox.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                    </svg>
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">Success</h2>
                    <p class="text-gray-600 text-center">Tạo mới thành công</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                </div>
            `;
            document.body.appendChild(alertBox);
            window.removeAlert = function() {
                alertBox.remove();
            };
        }
        return res.data;
    } catch (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                const alertBox = document.createElement("div");
                alertBox.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "flex", "justify-center", "items-center", "bg-gray-800", "bg-opacity-50", "z-50");
                alertBox.innerHTML = `
                    <div class="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1V6a4 4 0 1 1 0-8 4 4 0 0 1 0 8v5a1 1 0 0 1 1 1 1 1 0 0 1-1 1zM9 6v6h2V6H9z" clip-rule="evenodd" />
                        </svg>
                        <h2 class="text-xl font-semibold mb-2 text-gray-800">Unauthorized</h2>
                        <p class="text-gray-600 text-center">Bạn không có quyền cập nhật thông tin cây này.</p>
                        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4" onclick="removeAlert()">OK</button>
                    </div>
                `;
                document.body.appendChild(alertBox);
                window.removeAlert = function() {
                    alertBox.remove();
                };
            }
        

            console.log(error);
    }
}