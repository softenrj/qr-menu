import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Section from '@/components/menu_builder_section';
import TypeWriter from '@/components/TypeWriter';
import Menudone from '@/components/menuDone'

const Page = () => {
    return (
        <div>
            <Navbar />
            <section className='flex flex-col items-center'>
                <div className="heading flex flex-col gap-4 items-center mt-10 text-center mb-8">
                    <h1 className="font-playfair text-black text-center lg:text-[80px] text-[40px] leading-[5rem]">Let Make Your <span className='text-yellow-400 font-bold'>Menu</span></h1>
                    <p className='w-[70%]'><TypeWriter lp={1} content={["Take your dining experience to the next level with a digital menu that is easy to access, visually appealing, and effortlessly customizable. Say goodbye to printed menus and hello to a seamless, modern ordering experience!"]} /></p>
                </div>
                <div >
                    <Section />
                </div>
                <Menudone />
                
                

            </section>
            <Footer />
        </div>
    );
}

export default Page;
