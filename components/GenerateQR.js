"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";

const GenerateQR = ({ id, value,size }) => {
  return (
    <div id={id} className="flex justify-center items-center">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border-4 border-pink-500">
        <QRCode
          value={` http://172.16.115.208:3000/generateQR?id=${value}`}
          size={size ? size:280} // Adjusted for better fit
          logoImage="/logo.png"
          logoWidth={45}
          logoHeight={45}
          qrStyle="dots"
          eyeRadius={10}
          quietZone={10}
          fgColor="#000000"
          bgColor="#ffffff"
          id="qr-code"
        />
      </div>
    </div>
  );
};

export default GenerateQR;


