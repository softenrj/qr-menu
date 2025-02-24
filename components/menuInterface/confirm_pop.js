"use client";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import ItemContext from "./itemContext";
import Recept from "@/components/doc/recept";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ConformPop = ({ onClose, doneorder, userName }) => {
    const { itemprop, setitemprop } = useContext(ItemContext);
    const receiptRef = useRef(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const totalPrice = React.useMemo(() => {
        return itemprop.reduce((acc, item) => {
            const priceValue = parseFloat(item.pr.replace(/[^0-9.]/g, ""));
            return acc + priceValue * item.quantity;
        }, 0);
    }, [itemprop]);

    const handleOrder = async (paymentType) => {
        setIsProcessing(true);
        try {
            const response = await axios.post("/api/order", {
                table: userName,
                status: paymentType,
                items: itemprop.map(item => ({
                    name: item.title,
                    quantity: item.quantity
                })),
                total_Amount: totalPrice.toFixed(2)
            });

            if (response.status === 201) {
                setitemprop([]);
                try {
                    await generateReceipt();
                } catch (error) {
                    console.error("Receipt generation failed:", error);
                }
                doneorder();
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error("Order error:", error);
            let errorMessage = "Failed to place order";
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            alert(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const generateReceipt = () => {
        return new Promise((resolve, reject) => {
            const input = receiptRef.current;
            if (!input) {
                reject(new Error("Receipt element not found"));
                return;
            }
    
            html2canvas(input, { 
                useCORS: true, 
                scale: 2,
                logging: true,
                allowTaint: true
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                
                // Get PDF page dimensions
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                
                // Calculate image dimensions
                let imgWidth = 180; // Reduced from 190 to 180 for margins
                let imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Check if image height exceeds page height
                const margin = 10; // 10mm top and bottom margin
                if (imgHeight > pageHeight - margin * 2) {
                    // Scale down to fit page height
                    const ratio = (pageHeight - margin * 2) / imgHeight;
                    imgHeight = (pageHeight - margin * 2);
                    imgWidth = imgWidth * ratio;
                }
    
                // Center horizontally
                const x = (pageWidth - imgWidth) / 2;
                
                pdf.addImage(imgData, "PNG", x, margin, imgWidth, imgHeight);
                pdf.save("receipt.pdf");
                resolve();
            }).catch(reject);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {isSuccess ? (
                <div className="bg-white rounded-3xl shadow-xl relative p-6 animate-success">
                    <div className="flex flex-col items-center justify-center gap-4 p-8">
                        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="52" height="52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <h2 className="text-xl font-semibold text-green-600">Order Placed Successfully!</h2>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-xl relative p-6">
                    <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl" onClick={onClose}>
                        ✖
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800 text-center">Confirm Your Order</h2>
                    <p className="text-gray-600 text-center mt-2">
                        You have selected items worth <b>₹{totalPrice.toFixed(2)}</b>
                    </p>
                    <div className="flex justify-between mt-6">
                        <button 
                            onClick={() => handleOrder("Pay Now")} 
                            disabled={isProcessing}
                            className={`w-1/2 text-white py-2 rounded-l-xl ${
                                isProcessing ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                            }`}
                        >
                            {isProcessing ? 'Processing...' : 'Pay Now'}
                        </button>
                        <button 
                            onClick={() => handleOrder("Pay Later")} 
                            disabled={isProcessing}
                            className={`w-1/2 text-white py-2 rounded-r-xl ${
                                isProcessing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {isProcessing ? 'Processing...' : 'Pay Later'}
                        </button>
                    </div>
                </div>
            )}

            {/* Hidden Receipt - positioned off-screen */}
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <div ref={receiptRef}>
                    <Recept 
                        userName={userName} 
                        items={itemprop} 
                        totalAmount={totalPrice.toFixed(2)} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ConformPop;

