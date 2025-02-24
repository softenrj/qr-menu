"use client"
import React, { useState } from 'react';

const MenuItemCard = ({onDone}) => {
    const [image, setImage] = useState("/qrbuilder/default-img.png");
    const [title, setTitle] = useState("Name of your Food");
    const [price, setPrice] = useState("₹449");
    const [originalPrice, setOriginalPrice] = useState("₹699");
    const [isEditing, setIsEditing] = useState({ title: false, price: false, originalPrice: false });
    
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if(!file) return;
        const formData = new FormData();
        formData.append("image",file);

        try{
            const resp = await fetch("/api/upload",{
                method: "POST",
                body: formData
            });
            const data = await resp.json();
            if(resp.ok){
                setImage(data.imageUrl);
            }else{
                console.error(data.error);
            }
        }catch(e){
            console.log(e);
        }
    };
    
    const handleEdit = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
    };

    const handleBlur = (field, value) => {
        setIsEditing({ ...isEditing, [field]: false });
        if (field === "title") setTitle(value);
        if (field === "price") setPrice(value);
        if (field === "originalPrice") setOriginalPrice(value);
    };

    return (
        <div className="relative m-5 flex w-56 md:w-72 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="relative mx-3 mt-3 flex h-40 md:h-64 overflow-hidden rounded-xl">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute z-10 opacity-0 w-full h-full cursor-pointer" />
                <img src={image} alt="Uploaded preview" className='object-cover rounded-2xl' />
            </div>
            <div className="mt-3 px-4 pb-4">
                {isEditing.title ? (
                    <input type="text" autoFocus className="text-lg tracking-tight text-slate-900 border w-48" 
                        defaultValue={title} onBlur={(e) => handleBlur("title", e.target.value)} />
                ) : (
                    <h5 className="text-lg tracking-tight text-slate-900 cursor-pointer" onClick={() => handleEdit("title")}>{title}</h5>
                )}
                
                <div className="mt-2 mb-3 flex items-center justify-between">
                    <p>
                        {isEditing.price ? (
                            <input type="text" autoFocus className="text-xl font-bold text-slate-900 border w-16" 
                                defaultValue={price} onBlur={(e) => handleBlur("price", e.target.value)} />
                        ) : (
                            <span className="text-xl font-bold text-slate-900 cursor-pointer" onClick={() => handleEdit("price")}>{price}</span>
                        )}
                        
                        {isEditing.originalPrice ? (
                            <input type="text" autoFocus className="text-xs text-slate-900 line-through ml-2 border w-16" 
                                defaultValue={originalPrice} onBlur={(e) => handleBlur("originalPrice", e.target.value)} />
                        ) : (
                            <span className="text-xs text-slate-900 line-through ml-2 cursor-pointer" onClick={() => handleEdit("originalPrice")}>{originalPrice}</span>
                        )}
                    </p>
                </div>
                <div onClick={()=>{
                    onDone({
                        image,
                        title,
                        price,
                        originalPrice
                    })
                    setImage("/qrbuilder/default-img.png")
                    setTitle("Name of your Food")
                }} className=" flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Done
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;
