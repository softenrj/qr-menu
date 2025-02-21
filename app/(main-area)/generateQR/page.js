"use client";
import React, { useState, useEffect } from "react";
import GenerateQR from "@/components/GenerateQR";
import { Save, Delete, Download } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TypeWriter from "@/components/TypeWriter";

const QRGeneratorPage = () => {
  const [inputId, setInputId] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [savedQrs, setSavedQrs] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(Date.now());
  }, []);

  const generateNewQR = () => {
    const uniqueId = uuidv4().slice(0, 8);
    const newValue = inputId || uniqueId;
    setQrValue(newValue);
  };

  const handleSaveQR = () => {
    if (qrValue) {
      setSavedQrs((prev) => [
        ...prev,
        {
          id: inputId || `QR-${uuidv4().slice(0, 4)}`,
          value: qrValue,
          timestamp: Date.now(),
        },
      ]);
      setInputId("");
      setQrValue("");
    }
  };

  const handleDownload = (id, date) => {
    const canvas = document.querySelector(`#${id} canvas`);
    if (!canvas) {
      console.error("Canvas not found for ID:", id);
      return;
    }
    const link = document.createElement("a");
    link.download = `qr-code-${date}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleDelete = (timestamp) => {
    setSavedQrs(savedQrs.filter((qr) => qr.timestamp !== timestamp));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="text-center pt-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Generate Your
          <span className="text-pink-500 ml-2">
            <TypeWriter content={["QR Code"]} lp={true} />
          </span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          <TypeWriter content={["Create custom QR codes with your branding. Save and manage them easily."]} lp={true} />
        </p>
      </header>

      <section className="mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 m-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Identifier (optional)
                </label>
                <input
                  type="text"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                  placeholder="e.g., Table 2"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>

              <button
                onClick={generateNewQR}
                className="w-full bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Generate QR Code
              </button>

              {qrValue && (
                <button
                  onClick={handleSaveQR}
                  className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Save fontSize="small" />
                  Save to List
                </button>
              )}
            </div>

            {/* QR Preview */}
            <div className="flex-1">
              <GenerateQR value={qrValue} id="qr-code-main" />
            </div>
          </div>
        </div>

        {/* Saved QR Codes */}
        {savedQrs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-32">
            <h2 className="text-2xl font-semibold mb-6">Saved QR Codes</h2>
            <div className="flex flex-wrap justify-center md:justify-start w-full">
              {savedQrs.map((qr) => (
                <div key={qr.timestamp} className="group relative bg-gray-50 p-4 rounded-lg">
                  <GenerateQR id={`qr-code-${qr.timestamp}`} value={qr.value} size={250} />
                  <p className="text-sm font-medium text-center text-gray-700 mt-2 truncate">
                    {qr.id}
                  </p>

                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDownload(`qr-code-${qr.timestamp}`, date)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-pink-50"
                    >
                      <Download fontSize="small" className="text-pink-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(qr.timestamp)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50"
                    >
                      <Delete fontSize="small" className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default QRGeneratorPage;
