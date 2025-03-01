"use client"
import React,{useContext} from 'react';
import Navbar from '@/components/menuInterface/navbar';
import Sections from '@/components/menuInterface/sections';
import SectionTitle from '@/components/menuInterface/SectionTitle';
import Menupopulate from '@/components/menuInterface/Menupopulate';
import Footer from '@/components/menuInterface/Footer';
import Cart from '@/components/menuInterface/Cart';
import ItemContext from '@/components/menuInterface/itemContext';
import Confirmpage from '@/components/menuInterface/Confirmpage';
import { useParams } from 'next/navigation';
import AIInterface from '@/components/menuInterface/AI_interface';

const Page = () => {
    const [activeSection,setAS] = React.useState("All");
    const [itemprop,setitemprop] = React.useState([]);
    const [doneAdd,setDone] = React.useState(false);
    const [scaned,setScaned] = React.useState(false);
    const {user} =  useParams();
    const handleSection = (s) => {
        setAS(s);
    }
    const handleprocess = () => {
        setDone(!doneAdd);
    }

    React.useEffect(() => {
        if (!scaned && user) { 
            setScaned(true);
            fetch('/api/Activeuser',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user }),
        });
        }
    },[user,scaned])
    
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
            <AIInterface />
            <Sections setSec={handleSection} />
            <SectionTitle activesection={activeSection}/>
            <ItemContext.Provider value={{itemprop,setitemprop}}>
            <Menupopulate activeSection={activeSection} />
            {
                itemprop.length !== 0 ?
                <Cart doneAdd={handleprocess} />:null
            }
            {
                doneAdd ? 
                <Confirmpage doneAdd={handleprocess} userName={user} />:null
            }
            </ItemContext.Provider>
            
            <Footer />
            
        </div>
    );
}

export default Page;