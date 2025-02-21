"use client"
import React, { useContext } from "react";
import axios from "axios";
import ItemContext from "./itemContext";

const ConformPop = ({ onClose,doneorder,userName }) => {
    const { itemprop, setitemprop } = useContext(ItemContext);
    console.log(userName,typeof(userName));

    const handleOrder = async (paymentType) => {
        try {
            const response = await axios.post("/api/order", {
                table: userName,
                status: paymentType,
                items: itemprop.map(item => ({
                    name: item.title,
                    quantity: item.quantity
                }))
            });

            if (response.status === 201) {
                setitemprop([]);
                doneorder();
                onClose();
            }
        } catch (error) {
            console.error("Order error:", error);
            alert("Failed to place order");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-xl relative p-6">
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                    onClick={onClose}
                >
                    ✖
                </button>
                <h2 className="text-lg font-semibold text-gray-800 text-center">Confirm Your Order</h2>
                <p className="text-gray-600 text-center mt-2">
                    You have selected items worth <b>₹{itemprop.reduce((acc, item) => acc + item.quantity * parseFloat(item.pr.replace(/[^0-9.]/g, "")), 0).toFixed(2)}</b>
                </p>
                <div className="flex justify-between mt-6">
                    <button onClick={() => handleOrder("Pay Now")} className="w-1/2 bg-green-500 text-white py-2 rounded-l-xl hover:bg-green-600">
                        Pay Now
                    </button>
                    <button onClick={() => handleOrder("Pay Later")} className="w-1/2 bg-blue-500 text-white py-2 rounded-r-xl hover:bg-blue-600">
                        Pay Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConformPop;
