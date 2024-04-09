import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./deviceDetail.css";
import { HexColorPicker } from "react-colorful";
import { getPans, updateManually, updateRGB } from "../../redux/api/apiPan";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTemperatureHigh } from "react-icons/fa6";
import { FaTint } from 'react-icons/fa';
import Cookies from "js-cookie";

function DeviceDetail({ id }) {
  const [device, setDevice] = useState("");
  const [dateString, setDateString] = useState("");
  const [dateStringOn, setDateStringOn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCollection, setIsCollection] = useState("");
  const dispatch = useDispatch();
  const cookie = Cookies.get("token");

  const [color, setColor] = useState("#b32aa9");
  const navigate = useNavigate();
  const [temp, setTemp] = useState(29);
  const handleRGB = async (id, topic, RGB) => {
    const newRgb = RGB.substring(1);
    const updateDevice = {
      topic: topic,
      Hex: newRgb,
    };
    try {
      await updateRGB(dispatch, id, updateDevice);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateCollection = async (
    deviceId,
    topic,
    status,
    collectionId
  ) => {
    const updateDevice = {
      deviceId: deviceId,
      topic: topic,
      status: status,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/devices/collection/update/${collectionId}`,
        updateDevice
      );
      fetchDeviceCollection();
    } catch (error) {
      console.log(error);
    }
  };
  const handlemodeFan = async (id, topic,data) => {
    const updateDevice = {
      topic: topic,
      temp: data,
    };
    console.log(updateDevice);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/devices/tempFan/${id}`,
        updateDevice
      );
    } catch (error) {
      console.log(error);
    }
  };
  //gọi api lấy thông tin thiết bị
  const fetchDeviceData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/devices/${id}`
      );
      setDevice(response.data);

      const timestampOff = response.data.device.turn_off._seconds;
      const timestampOn = response.data.device.turn_on._seconds;
      const date_off = new Date(timestampOff * 1000);
      const date_On = new Date(timestampOn * 1000);
      setDateString(date_off.toLocaleDateString());
      setDateStringOn(date_On.toLocaleDateString());
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  const fetchDeviceCollection = async () => {
    try {
      const reponsive = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/devices/collection/${id}`
      );
      setIsCollection(reponsive.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDeviceCollection();
    fetchDeviceData();
  }, [id]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleDevice = async (id, topic, newStatus) => {
    const status = newStatus ? "ON" : "OFF";
    const updateDevice = {
      topic: topic,
      status: status,
    };
    try {
      await updateManually(id, dispatch, updateDevice, navigate,cookie);
      console.log("update staatus to", status);
      getPans(dispatch);
      fetchDeviceData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="deviceDetail-controller">
      <Row>
        <Col>
          {/* <h3 className="text-white">{device?.device.name}</h3> */}

          {device?.device.topic === "RGB" ? (
            <div key={device.id}>
              <h3 className="text-white">{device?.device.name}</h3>

              <HexColorPicker color={color} onChange={setColor} />
              <div className="value" style={{ borderLeftColor: color }}>
                Current color is {color}
                <button
                  onClick={() => handleRGB(id, device?.device.topic, color)}
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div
              key={id}
              className={`wrapper_deviceDetail ${
                device?.device.status === "ON" ? "checked" : ""
              }`}
            >
              <div className="deviceDetail">
                <h3 className="text-white">{device?.device.name}</h3>

                <label
                  className={`button deviceDetail_button button_${
                    device?.device.name
                  } ${device?.device.status === "ON" ? "checked" : ""}`}
                >
                  <input
                    className="hidden-checkbox"
                    type="checkbox"
                    checked={device?.device.status === "ON"}
                    onChange={() =>
                      handleDevice(
                        id,
                        device?.device.topic,
                        device?.device.status !== "ON"
                      )
                    }
                    id={`toggle ${id}`}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}
          {device.device.topic === "RGB" || device.device.topic === "DOOR" ? (
            <div>
              <h3 className="text-white">Turn on at: {dateStringOn}</h3>
              <h3 className="text-white">Turn off at: {dateString}</h3>
            </div>
          ) : (
            <div>
              <div className="wrapper-temp">
                {device.device.topic === "Fan" ? (
                  <div className="wrapper-flex">
                    <h2>
                      {temp}{" "}
                      <span>
                        <FaTemperatureHigh />
                      </span>
                    </h2>
                    <div className="increase-decrease">
                      <button onClick={() => setTemp(temp + 1)}>+</button>
                      <button onClick={() => setTemp(temp - 1)}>-</button>
                    </div>
                    <button
                      onClick={() => handlemodeFan(id, device.device.topic,temp)}
                    >
                      Update
                    </button>
                  </div>
                ) : device.device.topic === "PUMP" ? (
                  <div className="wrapper-flex">
                    <h2>
                      {temp}{" "}
                      <span>
                        <FaTint />
                      </span>
                    </h2>
                    <div className="increase-decrease">
                      <button onClick={() => setTemp(temp + 50)}>+</button>
                      <button onClick={() => setTemp(temp - 50)}>-</button>
                    </div>
                    <button
                      onClick={() => handlemodeFan(id, device.device.topic, temp)}
                    >
                      Update
                    </button>
                  </div>
                ): (
                  <div></div>
                )}
              </div>
              <div className="wrapper-detail">
                {isCollection.data?.map((item) => (
                  <p>
                    {item.name}:{" "}
                    <span>
                      {" "}
                      <input
                        type="checkbox"
                        checked={item.status === "Auto"}
                        onChange={() =>
                          handleUpdateCollection(
                            id,
                            item?.topic,
                            item?.status === "Auto" ? "Manual" : "Auto",
                            item?.id
                          )
                        }
                        id={`toggle ${id}`}
                      />
                    </span>
                  </p>
                ))}

                <p>
                  Ngày bật: <span>{dateStringOn}</span>
                </p>
                <p>
                  Ngày tắt: <span>{dateString}</span>{" "}
                </p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DeviceDetail;
