import React from 'react';

const MenusetionpageAdd = () => {
    return (
        <div className="w-full">
            <div className="bg-gradient-to-b from-purple-50 to-pink-50 mt-10 w-full">
                <div className="px-6 py-10 text-center md:px-12 md:py-16 w-full">
                    <h1 className="text-3xl leading-[52px] font-semibold md:text-4xl lg:text-5xl">
                        Transform the way you present 
                        <span className="bg-purple-600 text-white p-0.5 rounded-lg"> your menu</span> online.
                        <br />
                        <div className="sm:mt-2">
                            <span className="underline decoration-purple-600 underline-offset-4">
                                Explore a seamless digital dining experience.
                            </span>
                        </div>
                    </h1>
                    <p className="mt-4 text-lg font-medium leading-2 text-gray-600 md:text-xl">
                        Enhance customer engagement with a beautifully designed QR-based menu at QRMenu.
                    </p>
                    <div className="mt-8 flex justify-center gap-2">
                        <a href="/pages">
                            <button className="text-md rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 px-4 py-[10px] font-semibold text-white hover:bg-gradient-to-tl hover:from-purple-500 hover:to-purple-700">
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path>
                                    </svg>
                                    Learn More
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenusetionpageAdd;
