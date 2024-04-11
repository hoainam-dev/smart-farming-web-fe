import axios from 'axios';
import { increase } from '../counterSlice';
import { Alert } from '../../components/alert/Alert';
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
export const updatePlant = async (id, data, dispatch, onClose, token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/update/${id}`, data,  {
            headers: { authorization: `Bearer ${token}` },
          }); 
          if(res.status === 201) {
            //Show thông báo
            Alert(1500, 'Cập nhật cây trồng', 'Thông tin cây đã được cập nhật thành công!','success', 'OK');
        }
        onClose();
        dispatch(increase());
        return res.data;
    } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            //Show thông báo
                Alert(1500, 'Cập nhật cây trồng', 'Bạn không có quyền truy cập!','error', 'OK');
        }
        console.log(error);
    }
}
export const deletePlant = async (id, dispatch, onClose,  token) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/plants/delete/${id}`, {
            headers: { authorization: `Bearer ${token}` },
          }); 
        if (res.status === 201) {
            //Show thông báo
            Alert(1500, 'Xóa cây trồng', 'Thông tin cây đã xóa thành công!','success', 'OK');
        }
        onClose();
        dispatch(increase());
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
export const createPlant = async (data, dispatch, onClose, token) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/create`, data,  {
            headers: { authorization: `Bearer ${token}` },
          }); 
          if(res.status === 201) {
            //Show thông báo
            Alert(1500, 'Tạo cây trồng', 'Tạo cây trồng thành công!','success', 'OK');
        }
        onClose();
        dispatch(increase());
        return res.data;
    } catch (error) {
        if ( error.response.status === 401 || error.response.status === 403) {
            //Show thông báo
            Alert(1500, 'Tạo cây trồng', 'Bạn không có quyền truy cập!','error', 'OK');
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
            //Show thông báo
            Alert(1500, 'Tạo collection', 'Tạo collection thành công!','succcess', 'OK');
        }
        return res.data;
    } catch (error) {
            if (error.response.status === 401 || error.response.status === 403) {
                //Show thông báo
                Alert(1500, 'Tạo collection', 'Bạn không có quyền cập nhật thông tin của cây này!','error', 'OK');
            }
        

            console.log(error);
    }
}