"use client";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";

const GenerateQR = ({ id, value, size }) => {
  const [networkIP, setNetworkIP] = useState("http://localhost:3000"); // Default URL

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const res = await fetch("/api/get-ip");
        const data = await res.json();
        setNetworkIP(data.ip); // Set network IP dynamically
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    };

    fetchIP();
  }, []);

  return (
    <div id={id} className="flex justify-center items-center">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border-4 border-pink-500">
        <QRCode
          value={`${networkIP}/MenuInterface`}
          size={size ? size : 280}
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
