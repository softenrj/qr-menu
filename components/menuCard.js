"use client";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const MenuItemCard = ({ deleteCard, image, title, price, originalPrice }) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="relative m-5 flex w-56 md:w-72 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="relative mx-3 mt-3 flex h-40 md:h-64 overflow-hidden rounded-xl">
        <img src={image} alt={title} className="object-cover rounded-2xl w-full h-full" loading="lazy" />
        {discount > 0 && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-xs font-medium text-white">
            {discount}% OFF
          </span>
        )}
        <DeleteForeverIcon
          className="absolute top-0 right-0 m-2 text-blue-300 cursor-pointer hover:text-red-500"
          onClick={deleteCard}
          aria-label="Delete item"
        />
      </div>
      <div className="mt-3 px-4 pb-4">
        <h5 className="text-lg tracking-tight text-slate-900">{title}</h5>
        <div className="mt-2 mb-3 flex items-center justify-between">
          <p>
            <span className="text-xl font-bold text-slate-900">{price}</span>
            {originalPrice && <span className="text-xs text-slate-900 line-through ml-2">{originalPrice}</span>}
          </p>
        </div>
        <button className="flex items-center justify-center w-full rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
