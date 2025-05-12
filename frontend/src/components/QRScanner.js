import React, { useEffect } from 'react';
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  useEffect(() => {
    const qrRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrRegionId);

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: 250
          },
          qrCodeMessage => {
            console.log("Hasil QR:", qrCodeMessage);
            alert(`QR Ditemukan: ${qrCodeMessage}`);
          },
          errorMessage => {
            // ignore scan errors
          }
        );
      }
    });

    return () => {
      html5QrCode.stop().then(() => {
        console.log("QR stopped");
      });
    };
  }, []);

  return (
    <div>
      <h2>Scanner QR</h2>
      <div id="reader" style={{ width: "300px" }}></div>
    </div>
  );
};

export default QRScanner;
