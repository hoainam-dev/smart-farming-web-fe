import React, { useState } from "react";

export default function Attendance() {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      {index==0?
      <h1 className="pt-[5rem] px-[7rem] text-white font-4xl font-bold">Danh sách điểm danh</h1>
      :
      <h1 className="pt-[5rem] px-[7rem] text-white font-4xl font-bold">Danh sách nhân viên</h1>
      }
      
      <div className="flex mx-[7rem] my-5 bg-gray-200 w-fit rounded-lg">
        <div className={`px-4 py-0 h-[3rem] w-[8rem] text-center cursor-pointer rounded-s-lg ${index==0?'bg-[#09334b] border-b-4 border-b-red-600':''}`}
             onClick={()=>{setIndex(0)}}>
          <p className={`mt-[0.1rem] ${index==0?'text-white':'text-black'}`}>Điểm danh</p>
        </div>
        <div className={`px-4 py-0 h-[3rem] w-[8rem] text-center cursor-pointer rounded-e-lg ${index==1?'bg-[#09334b] border-b-4 border-b-red-600':''}`}
            onClick={()=>{setIndex(1)}}>
          <p className={`mt-[0.1rem] ${index==1?'text-white':'text-black'}`}>Nhân viên</p>
        </div>
      </div>
      {index===0?
        <AttendenceList />
      :
        <EmployeeList />
      }
    </div>
  );
}

const AttendenceList = () => {
  return(
    <>
      <div class="relative overflow-x-auto mt-[1rem] px-[7rem]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Id
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Date
              </th>
              <th scope="col" class="px-6 py-3">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4 text-black">Apple</td>
              <td class="px-6 py-4 text-black">Silver</td>
              <td class="px-6 py-4 text-black">Laptop</td>
              <td class="px-6 py-4 text-black">$2999</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4 text-black">Apple</td>
              <td class="px-6 py-4 text-black">Silver</td>
              <td class="px-6 py-4 text-black">Laptop</td>
              <td class="px-6 py-4 text-black">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

const EmployeeList = () => {
  return(
    <>
      <div class="relative overflow-x-auto mt-[2rem] px-[7rem]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Laptop</td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">White</td>
              <td class="px-6 py-4">Laptop PC</td>
              <td class="px-6 py-4">$1999</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">Black</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};
