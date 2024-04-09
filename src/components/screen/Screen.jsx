import React from "react";
import "./screen.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import {getTempHumidity} from '../../redux/api/apiTempHumidity'
function Screen({temps}) {
  const tempHumidity = useSelector((state) => state.tempHumiditys.tempHumiditys?.tempHumidity);
  const dispatch = useDispatch();
  useEffect(() => {

      getTempHumidity(dispatch); 

  }, []);

  const temperature = tempHumidity?.temperature || 0;
  const humidity = tempHumidity?.humidity || 0;
  
  return (
    <div className="screen ">
     {
       temps.map((temp) => (
        <div key={temp.id} className="flex justify-between w-[100%]">
        <div className="temperature">
        {" "}
        <div className="icon">
          <i className="uil uil-temperature-half"></i>
        </div>
        <div className="text">
          <h3>{temp.temperature} °C</h3>
          <p>Temperature</p>
        </div>
      </div>
      <div className="humidity">
        <div className="icon">
          <i className="uil uil-tear"></i>
        </div>
        <div className="text">
          <h3>{temp.humidity}%</h3>
          <p>Humidity</p>
        </div>
      </div>
      <div className="weather">
        <div className="icon">
          <i className="uil uil-tear">{temp.soilMoisture}</i>
        </div>
      </div>
        </div>
      ))
     }
    </div>
  );
}

export default Screen;
