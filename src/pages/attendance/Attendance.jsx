import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendance, getAttendanceFromDay } from "../../redux/api/apiAttendance";
import { CSVLink } from 'react-csv';
import "./Loadding.css"
import EmployeeList from "../../components/employeeList/EmployeeList";
import AttendenceList from "../../components/attendance/AttendanceList";

export default function Attendance() {
  // Lấy giá trị index từ sessionStorage, nếu không tồn tại thì sử dụng giá trị mặc định là 0
  const initialIndex = sessionStorage.getItem('index') ? parseInt(sessionStorage.getItem('index')) : 0;
  const [index, setIndex] = useState(initialIndex);

  const date = useSelector((state) => state.attendance?.date);

  const dispatch = useDispatch();

  // Lưu giá trị index vào sessionStorage mỗi khi index thay đổi
  useEffect(() => {
    sessionStorage.setItem('index', index.toString());
    dispatch(getAllAttendance());
  }, [index]);

  return (
    <div className="">
      {index==0?
      <h1 className="pt-[5rem] px-[7rem] font-4xl font-bold">Danh sách điểm danh</h1>
      :
      <h1 className="pt-[5rem] px-[7rem] font-4xl font-bold">Danh sách nhân viên</h1>
      }
      <div className="flex mx-[7rem] my-5 bg-gray-200 w-fit rounded-lg">
        <div className={`px-4 py-0 h-[3rem] w-[8rem] text-center cursor-pointer rounded-s-lg ${index==0?'bg-[#47A992] border-b-4 border-b-[#09334b]':''}`}
             onClick={()=>{setIndex(0)}}>
          <p className={`mt-[0.1rem] ${index==0?'text-white':'text-black'}`}>Điểm danh</p>
        </div>
        <div className={`px-4 py-0 h-[3rem] w-[8rem] text-center cursor-pointer rounded-e-lg ${index==1?'bg-[#47A992] border-b-4 border-b-[#09334b]':''}`}
            onClick={()=>{setIndex(1)}}>
          <p className={`mt-[0.1rem] ${index==1?'text-white':'text-black'}`}>Nhân viên</p>
        </div>
      </div>
      {index===0?
        <AttendenceList days={date}/>
      :
        <EmployeeList />
      }
    </div>
  );
}
