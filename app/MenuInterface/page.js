"use client"
import React from 'react';
import Navbar from '@/components/menuInterface/navbar';
import Sections from '@/components/menuInterface/sections';
import SectionTitle from '@/components/menuInterface/SectionTitle';
import Menupopulate from '@/components/menuInterface/Menupopulate';
import Footer from '@/components/menuInterface/Footer';

const Page = () => {
    const [activeSection,setAS] = React.useState("All");
    const handleSection = (s) => {
        setAS(s);
    }
    return (
        <div className="text-center">
            <Navbar />
            
            <div className="poster flex flex-col items-center justify-center w-full">
                <img 
                    src="/MenuInterface/b1.jpg" 
                    className="mt-4 rounded-2xl mx-auto block w-11/12 h-auto" 
                />
                <h1 className="text-4xl font-bold mt-4 text-gray-300">
                    What's Your Mood Today?
                </h1>
                <hr className="border-b-0 border-dotted border-8 w-24 mt-4 mx-auto" />
            </div>
            <Sections setSec={handleSection} />
            <SectionTitle activesection={activeSection}/>
            <Menupopulate activeSection={activeSection} />
            <Footer />
            
        </div>
    );
}

export default Page;