import React, { useState } from 'react'
import DeviceDetail from '../deviceDetail/DeviceDetail'
import './device.css'
function Device({name, id, currentDeviceId, onDeviceClick}) {
  const handleDevice = () => {
    onDeviceClick(prevDeviceId => prevDeviceId !== id ? id : null);
  }

  return (
    <div className="button-device">
      <button onClick={handleDevice}>{name}</button>
      {currentDeviceId === id && <DeviceDetail id={id} />}
    </div>
  ) 
}

export default Device