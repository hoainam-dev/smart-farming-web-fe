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
export const updatePlant = async (id, data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/plants/update/${id}`, data); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const deletePlant = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/plants/delete/${id}`); 
        return res.data;
    } catch (error) {
        console.log(error);
    }
}