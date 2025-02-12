import React from 'react';

const ItemCard = ({ title, image, orp, pr }) => {
    return (
        <div className="inline-block w-44 rounded-xl shadow-md p-3">
            <div className="relative">
                
                <div className="absolute top-2 right-3 h-8 w-14 bg-white border-2 border-green-300 flex items-center justify-center rounded-lg text-xl cursor-pointer hover:bg-green-100 transition-all">
                    +
                </div>
                
                <img 
                    src={image} 
                    alt="Food Item" 
                    className="h-36 w-full rounded-2xl object-cover"
                />
            </div>

           
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
