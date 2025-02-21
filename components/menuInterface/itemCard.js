"use client";
import React, { useContext } from "react";
import ItemContext from "./itemContext";

const ItemCard = ({ id, title, image, orp, pr }) => {
    const { itemprop, setitemprop } = useContext(ItemContext);

    const currentItem = (itemprop || []).find(item => item.id === id);
    const itemCount = currentItem ? currentItem.quantity : 0;
    const isInCart = itemCount > 0;

    const toggleCart = () => {
        setitemprop(prev =>
            isInCart
                ? prev.filter(item => item.id !== id)
                : [...prev, { id, title, image, quantity: 1, pr }]
        );
    };

    const addMore = () => {
        setitemprop(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
            )
        );
    };

    const removeOne = () => {
        setitemprop(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    return (
        <div className="inline-block w-44 rounded-xl shadow-md p-3">
            <div className="relative">
                <div 
                    className="absolute top-2 right-3 h-8 w-14 bg-white border-2 border-green-300 flex items-center justify-center rounded-lg text-xl cursor-pointer hover:bg-green-100 transition-all" 
                    onClick={toggleCart}
                >
                    {isInCart ? 'X' : '+'} 
                </div>
                <img
                    src={image}
                    alt="Food Item"
                    className="h-36 w-full rounded-2xl object-cover"
                />
            </div>

            {isInCart && (
                <div className="addmore flex justify-between items-center px-1 rounded-full h-6 w-16 bg-[#239e44] mt-2 -mb-1">
                    <span 
                        className="text-white bg-[#1d7d36] h-4 w-4 rounded-full flex justify-center items-center cursor-pointer" 
                        onClick={removeOne}
                    >
                        -
                    </span>
                    <span>{itemCount}</span> 
                    <span 
                        className="text-white bg-[#1d7d36] h-4 w-4 rounded-full flex justify-center items-center cursor-pointer" 
                        onClick={addMore}
                    >
                        +
                    </span>
                </div>
            )}

            <p className="font-dmSans mt-2 text-lg font-semibold text-gray-800 text-start">
                {title}
            </p>
            <div className="flex gap-3 items-center mt-1">
                <p className="text-lg font-bold text-green-700">{pr}</p>
                <p className="text-gray-500 line-through text-sm">{orp}</p>
            </div>
        </div>
    );
};

export default ItemCard;
