import axios from 'axios';
import {getTempHumidityFail,getTempHumidityStart,getTempHumiditySuccess,getTempFail,getTempStart,getTempSuccess} from '../tempHumiditySlice'
export const getTempHumidity = async(dispatch,slug) => {
    dispatch(getTempHumidityStart());
    try{
        console.log(process.env.REACT_APP_BACKEND_URL);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/tempHumidity/temp`,)
        dispatch(getTempHumiditySuccess(res.data))
    }catch(err) {
        dispatch(getTempHumidityFail(err))
    }
};
export const getHumiditys = async(dispatch) => {
    dispatch(getTempStart());
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/tempHumidity/humidity`,)
        dispatch(getTempSuccess(res.data))
    }catch(err) {
        dispatch(getTempFail(err))
    }
};