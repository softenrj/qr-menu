import React from "react";
import Link from "next/link";

function Navbar() {
    return (
        <div className="bg-[#f4f5f7] h-24 flex items-center justify-between px-8 shadow-md">
            {/* Logo Section */}
            <div className="flex items-center">
                <img src="/shared/Softcore.png" alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Navigation Section */}
            <div className="flex gap-6 text-gray-800">
                <Link href="/home" className="
                      hover:bg-gray-500 hover:text-white p-1 rounded-[8px]
                       font-dmSans text-xl">Home</Link>
                <Link href="/about" className="
                      hover:bg-gray-500 hover:text-white p-1 rounded-[8px]
                       font-dmSans text-xl">About</Link>
                <Link href="/contact" className="
                      hover:bg-gray-500 hover:text-white p-1 rounded-[8px]
                       font-dmSans text-xl">Contact</Link>
            </div>
        </div>
    );
}

export default Navbar;
