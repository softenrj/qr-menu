"use client"
import React, { useState } from 'react';

const MenuItemCard = () => {
    const [image, setImage] = useState("/serviceTab/poster-1.jpeg");
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };

    return (
        <div className="relative m-5 flex w-56 md:w-72 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="relative mx-3 mt-3 flex h-40 md:h-64 overflow-hidden rounded-xl">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute z-10 opacity-0 w-full h-full cursor-pointer" />
                <img src={image} alt="Uploaded preview" className='object-cover rounded-2xl' />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-xs font-medium text-white">39% OFF</span>
            </div>
            <div className="mt-3 px-4 pb-4">
                <h5 className="text-lg tracking-tight text-slate-900">Nike Air MX Super 2500 - Red</h5>
                <div className="mt-2 mb-3 flex items-center justify-between">
                    <p>
                        <span className="text-xl font-bold text-slate-900">$449</span>
                        <span className="text-xs text-slate-900 line-through ml-2">$699</span>
                    </p>
                    <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="ml-2 rounded bg-yellow-200 px-1.5 py-0.5 text-xs font-semibold">5.0</span>
                    </div>
                </div>
                <a href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to cart
                </a>
            </div>
        </div>
    );
};

export default MenuItemCard;