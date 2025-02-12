"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sections = ({setSec}) => {
    const [sections, setSections] = useState(["All"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/sections');
                const uniqueSections = new Set([...sections, ...response.data.map(s => s.label)]);
                setSections(Array.from(uniqueSections));
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className=" mt-6 flex gap-4 px-4 py-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            {sections.map((sec, idx) => (
                <div 
                    onClick={() => setSec(sec)}
                    key={idx} 
                    className="h-10 px-6 flex items-center justify-center border rounded-full min-w-max font-dmSans text-lg font-medium text-gray-700 bg-white shadow-sm hover:bg-fuchsia-100 hover:border-fuchsia-400 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    {sec}
                </div>
            ))}
        </div>
    );
}

export default Sections;
