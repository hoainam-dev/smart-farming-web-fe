import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAttendance } from "../../redux/api/apiAttendance";
import Plant from "../../components/plant/Plant";

function PlantPage() {
  const initialIndex = sessionStorage.getItem("index")
    ? parseInt(sessionStorage.getItem("index"))
    : 0;
  const [index, setIndex] = useState(initialIndex);

  const date = useSelector((state) => state.attendance?.date);

  const dispatch = useDispatch();

  // Lưu giá trị index vào sessionStorage mỗi khi index thay đổi
  useEffect(() => {
    sessionStorage.setItem("index", index.toString());
    dispatch(getAllAttendance());
  }, [index]);

  return (
    <div className="pt-10">
      <Plant />
    </div>
  );
}

export default PlantPage;
