import React from "react";

const Recept = ({ userName, items, totalAmount }) => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-600">
            <div className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
                <img src="/shared/TNE-logo.png" alt="chippz" className="mx-auto w-16 py-4" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <h4 className="font-semibold">Smart Qmenu Elits</h4>
                    <p className="text-xs">😚🤗🤩</p>
                </div>
                <div className="flex flex-col gap-3 border-b py-6 text-xs">
                    <p className="flex justify-between">
                        <span className="text-gray-400">Receipt No.:</span>
                        <span>#{Math.floor(Math.random() * 10000)}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Order Type:</span>
                        <span>Dine-in</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-gray-400">Customer:</span>
                        <span>{userName}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                    <table className="w-full text-left mb-8">
                        <thead>
                            <tr>
                                <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                                <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 text-gray-700">{item.title}</td>
                                    <td className="py-4 text-gray-700">{item.quantity}</td>
                                    <td className="py-4 text-gray-700">₹{(item.quantity * parseFloat(item.pr.replace(/[^0-9.]/g, ""))).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mb-8">
                        <div className="text-gray-700 mr-2">Total:</div>
                        <div className="text-gray-700 font-bold text-xl">₹{totalAmount}</div>
                    </div>
                    <div className="border-b border-dashed"></div>
                    <div className="py-4 flex justify-center items-center flex-col gap-2">
                        <p className="flex gap-2">📧 rjsharmase@gmail.com</p>
                        <p className="flex gap-2">📍 Smart Qmenu, City</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recept;
