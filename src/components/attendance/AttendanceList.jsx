import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { CSVLink } from 'react-csv';

import { getAttendanceFromDay } from "../../redux/api/apiAttendance";

export default function AttendanceList({ days }) {
    const dispatch = useDispatch();
    const datas = useSelector((state) => state.attendance?.data);
  
    // Khai báo các tiêu đề cột cho tệp CSV
    const headers = [
      { label: 'Id', key: 'Id' },
      { label: 'Name', key: 'Name' },
      { label: 'Checkin Date', key: 'Date' },
      { label: 'Checkin Time', key: 'Time' }
    ];
  
    const [loadding, setLoadding] = useState(false);
  
    const currentDate = new Date();
  
    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = currentDate.getFullYear();
  
    // Kết hợp các giá trị để tạo ra ngày hôm nay dưới dạng string
    const todayDateString = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  
    // Xử lý sự kiện khi người dùng thay đổi tùy chọn trong dropdown
    const handleSelectChange = (event) => {
      const selectedDayId = event.target.value;
      setLoadding(true);
      dispatch(getAttendanceFromDay(selectedDayId, setLoadding));
    };
  
    //Lấy giá trị mặc định hôm nay
    useState(()=>{
      setLoadding(true);
      dispatch(getAttendanceFromDay(todayDateString, setLoadding));
    },[])
  
    return(
      <>
        <div class="relative overflow-x-auto mt-[1rem] px-[7rem]">
          <div className="flex gap-5 items-center">
            <select onChange={handleSelectChange} class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg">
              <option selected disabled>{todayDateString}</option>
              {days.map((day, index) => (
                <option value={day.id} key={index}>{day.id}</option>
              ))}
            </select>
            <CSVLink className="flex items-center gap-2 bg-gray-50 h-fit py-[0.4rem] px-3 font-medium rounded-lg" data={datas} headers={headers} filename={`diem-danh-${todayDateString}.csv`}>
              <svg svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
              <h5>Xuất file</h5>
            </CSVLink>
          </div>
          
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3" style={{ width: '15%' }}>Face Id</th>
                <th scope="col" class="px-6 py-3" style={{ width: '25%' }}>Name</th>
                <th scope="col" class="px-6 py-3" style={{ width: '25%' }}>Checkin Date</th>
                <th scope="col" class="px-6 py-3" style={{ width: '25%' }}>Checkin Time</th>
              </tr>
            </thead>
            <tbody>
              {loadding?
              <tr>
                <td scope="col" colSpan="4" align="center" className="pt-[1rem]">
                  <div className="loadding"></div>
                </td>
              </tr>
              :
              datas.length!=0
                ?
                datas.map((data, index) => (
                  <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 text-black">{data.FaceId}</td>
                    <td class="px-6 py-4 text-black">{data.Name}</td>
                    <td class="px-6 py-4 text-black">{data.Date}</td>
                    <td class="px-6 py-4 text-black">{data.Time}</td>
                  </tr>
                ))
                :
                <td colSpan={4} className="pt-[1rem]">Không có nhân viên nào điểm danh trong ngày này</td>
              }
            </tbody>
          </table>
        </div>
      </>
    )
}