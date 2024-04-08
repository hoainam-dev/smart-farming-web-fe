import React, { useState, useEffect } from "react";
import "./control.css";
import { useSelector, useDispatch } from "react-redux";
import { getPans, updateManually, updateRGB } from "../../redux/api/apiPan";
import { useNavigate } from "react-router-dom";
import QRCodeComponent from "../QRCodeComponent/QRCodeComponent";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import pump from "../../assets/images/Pumb.png";
import RGB from "../../assets/images/ledRGB.png";
import Device from "../device/Device";
function Control(props) {
  const pans = useSelector((state) => state.pans.pans?.pan?.devices);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDeviceId, setCurrentDeviceId] = useState(null);
  const handleDevice = async (id, topic, newStatus) => {
    const status = newStatus ? "ON" : "OFF";
    const updateDevice = {
      topic: topic,
      status: status,
    };
    try {
      await updateManually(id, dispatch, updateDevice, navigate);
      getPans(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getPans(dispatch);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="control">
      <div className="container-btn">
        {pans
          ?.filter((device) => ["physical"].includes(device.control))
          .map((device) => (
            <div
              key={device.id}
              className={`wrapper_btn ${
                device.status === "ON" ? "checked" : ""
              }`}
            >
              <div className="device">
                <label
                  htmlFor={`toggle ${device.id}`}
                  className={`button button_${device.name} ${
                    device.status === "ON" ? "checked" : ""
                  }`}
                >
                  <input
                    className="hidden-checkbox"
                    type="checkbox"
                    checked={device.status === "ON"}
                    onChange={() =>
                      handleDevice(
                        device.id,
                        device.topic,
                        device.status !== "ON"
                      )
                    }
                    id={`toggle ${device.id}`}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              {device.topic !== "MANUALLY" && (
                <span>
                  <img
                    src={`${
                      device.topic === "Fan"
                        ? "https://icon-library.com/images/fan-icon-png/fan-icon-png-2.jpg"
                        : device.topic === "LED"
                        ? "https://i.ibb.co/kGjpJyb/led-rgb.png"
                        : device.topic === "PUMP"
                        ? `${pump}`
                        : device.topic === "RGB"
                        ? `${RGB}`
                        : "https://s3-alpha-sig.figma.com/img/22be/20b3/70f35e8f8873a4a8d5a4458b34e0195e?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SutsjwQCbhKqIR7CiGa1nB1nIxtBXvRGKkW6y7X~7Tg0qhPHQa3tPtTyEvT31H-~FY~xX9s4pouZzD-ELNySZHcHNtYbuY2ODR~4S9jx-qFNCo11dFNC-wlvR2ro4PXYQVtsNAJ48xm8R1DbovAfJewCXBCCyLyefSNsk9RBprVUe2IKwj1z13UZ4mmcNs-sZ7BHwPTADjQHjMB68doe--4qWE8ckg277Z5y8zKp8AfyF94L0gnL9GCos6dVau5Ecw-lsqB58YHtuhgfELrcgGhNNVQbCLV2tZD-tWvxDZGvTvRmTYM9re4iBo~QtEaZbiDeYSgftHVxYLCGU98FUw__"
                    }`}
                    className={`${
                      device.topic === "Fan" && device.status === "ON"
                        ? "rotate-animation"
                        : device.topic === "LED" && device.status === "ON"
                        ? "light-animation"
                        : ""
                    }`}
                    alt=""
                  />
                </span>
              )}
              {device.control === "physical" ? (
                <div>
                  <Device
                    name={device.name}
                    id={device.id}
                    currentDeviceId={currentDeviceId}
                    onDeviceClick={setCurrentDeviceId}
                  />
                </div>
              ) : (
                ""
              )}

              {device.name !== "MANUALLY" && (
                <div className="handmade_btn">
                  <label htmlFor={`fanbtn-${device.id}`} className="switch">
                    <div className="powersign"></div>
                  </label>
                  <input
                    className="handmade_button"
                    type="checkbox"
                    checked={device.status === "ON"}
                    onChange={() =>
                      handleDevice(
                        device.id,
                        device.topic,
                        device.status !== "ON"
                      )
                    }
                    id={`fanbtn-${device.id}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      {/* <QRCodeComponent /> */}
    </div>
  );
}

export default Control;
