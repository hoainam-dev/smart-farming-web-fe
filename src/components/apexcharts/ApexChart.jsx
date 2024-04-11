import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import "./styles.css";
import { getHumiditys, getTempHumidity } from "../../redux/api/apiTempHumidity";
import { useSelector, useDispatch } from "react-redux";

function ApexChart() {
  const temp = useSelector((state) => state.tempHumiditys.temps?.temp);
  const tempHumidity = useSelector(
    (state) => state.tempHumiditys?.tempHumiditys?.tempHumidity
  );
  const dispatch = useDispatch();
  const timestamps = tempHumidity
    ? tempHumidity.map((tempData) => tempData.timestamp)
    : [];
  const humiditys = temp ? temp.map((tempData) => tempData._id) : [];
  const dates = timestamps.map((timestamp) => {
    const date = new Date(Date.parse(timestamp));
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  useEffect(() => {
    getTempHumidity(dispatch);
    getHumiditys(dispatch);
  }, []);

  const chartDataTemp = {
    options: {
      chart: {
        id: "temperature-chart",
      },
      xaxis: {
        categories: tempHumidity ? dates : [],
      },
      yaxis: {
        title: {
          text: "Temperature (°C)",
        },
      },
    },
    series: [
      {
        name: "Temperature",
        data: tempHumidity
          ? tempHumidity.map((tempData) => tempData.temperature)
          : [],
      },
    ],
  };

  const options = {
    series: [
      {
        name: "Humidity",
        data: temp ? temp.map((tempData) => tempData.averageHumidity) : [],
      },
    ],
    chart: {
      background: '#fff',
      type: "line",
    },
    forecastDataPoints: {
      count: 2,
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      categories: humiditys,
      tickAmount: 8,
    },
    title: {
      text: "Humidity",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      min: 70,
      max: 100,
    },
  
  };

  // Dự đoán nhiệt độ cảnh báo và lời khuyên
  const predictedTemp = tempHumidity ? tempHumidity.temperature : []; // Đây là giả định, bạn cần tính toán dự đoán thực tế
  let alertMessage = "";
  let adviceMessage = "";

  if (predictedTemp > 35) {
    alertMessage = "Cảnh báo: Nhiệt độ quá cao!";
    adviceMessage = "Hãy đảm bảo bạn duy trì sự mát mẻ và uống nhiều nước.";
  } else if (predictedTemp < 20) {
    alertMessage = "Cảnh báo: Nhiệt độ quá thấp!";
    adviceMessage = "Hãy mặc ấm và tránh ra khỏi nhà nếu không cần thiết.";
  } else {
    alertMessage = "Nhiệt độ trong khoảng bình thường.";
    adviceMessage = "Hãy tiếp tục thực hiện các hoạt động thông thường.";
  }

  return (
    <div>
      <div className="temperature-chart">
        <ReactApexChart
          options={chartDataTemp.options}
          series={chartDataTemp.series}
          type="line"
          height={window.innerWidth < 500 ? 300 : 350}
          width={window.innerWidth < 500 ? 300 : 700}
        />
      </div>
      <div id="temperature-chart">
        <ReactApexChart
          options={options}
          series={options.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}
export default ApexChart;
