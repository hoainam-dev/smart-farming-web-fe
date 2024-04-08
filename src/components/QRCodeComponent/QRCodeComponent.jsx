import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const App = () => {
    const [apkUrl, setApkUrl] = useState('https://drive.google.com/file/d/1RLrjZxG9IQwSp1i8bI2O7QJrNg8r8bi6/view?usp=drive_link');
    const handleQRScan = () => {
        window.location.href = apkUrl; // Tải tệp APK về khi quét mã QR
      };

  return (
    <div>
     <h1>Quét mã QR để tải ứng dụng</h1>
     <QRCode value={apkUrl} />
      <button onClick={handleQRScan}>Quét mã QR</button>
    </div>
  );
};

export default App;
