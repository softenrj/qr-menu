"use client";
import React, { useContext, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import ItemContext from "./itemContext";
import ConfirmPop from "./confirm_pop";

const AnimatedDiv = ({ doneAdd,userName }) => {
    const { itemprop, setitemprop } = useContext(ItemContext);
    const containerRef = useRef(null);
    const [placeorder,setplaceorder] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true);

    const handlePlaceorder = () => {
        setplaceorder(!placeorder)
    }


    const totalPrice = useMemo(() => {
        return itemprop.reduce((acc, item) => {
            const priceValue = parseFloat(item.pr.replace(/[^0-9.]/g, ""));
            return acc + priceValue * item.quantity;
        }, 0);
    }, [itemprop]);

    return (
        <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed w-[90%] ml-[5%] mb-3 max-w-md bg-white z-50 bottom-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, { offset }) => offset.y > 50 && (setIsVisible(false), doneAdd())}
        >
            
            <div className="w-full flex justify-center items-center pt-3 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
            </div>

            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>

               
                <div
                    className="w-full h-64 overflow-y-auto scrollbar-hide mt-4 px-2"
                    ref={containerRef}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    {itemprop.length === 0 ? (
                        <p className="text-gray-500 mt-4">Your cart is empty.</p>
                    ) : (
                        itemprop.map(item => {
                            const priceValue = parseFloat(item.pr.replace(/[^0-9.]/g, ""));
                            return (
                                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg shadow-sm my-2">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} className="h-16 w-16 rounded-lg object-cover shadow" />
                                        <div className="text-left">
                                            <p className="font-semibold text-lg text-gray-800">{item.title}</p>
                                            <hr className="border-dotted border-gray-400 w-1/2 mt-1" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden shadow-md">
                                            <button className="px-3 py-1 hover:bg-green-700 transition"
                                                onClick={() => setitemprop(prev => prev.map(it => it.id === item.id ? { ...it, quantity: it.quantity - 1 } : it).filter(it => it.quantity > 0))}>
                                                -
                                            </button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button className="px-3 py-1 hover:bg-green-700 transition"
                                                onClick={() => setitemprop(prev => prev.map(it => it.id === item.id ? { ...it, quantity: it.quantity + 1 } : it))}>
                                                +
                                            </button>
                                        </div>
                                        <span className="text-gray-800 text-sm mt-1">₹{(priceValue * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                
                    {placeorder ? <ConfirmPop userName={userName} doneorder={doneAdd} onClose={handlePlaceorder} cartItems={itemprop} /> : null}

                

                
                {itemprop.length > 0 && (
                    <div className="w-full flex flex-col items-center justify-between p-4 border-t mt-4">
                        <div className="w-full flex justify-between text-lg font-semibold">
                            <span>Total:</span>
                            <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <button onClick={handlePlaceorder} className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                            Order Now
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AnimatedDiv;
