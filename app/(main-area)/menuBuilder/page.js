import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MenuItemCard from '@/components/menu_ItemCard';
import Section from '@/components/menu_builder_section';
import TypeWriter from '@/components/TypeWriter';

const Page = () => {
    return (
        <div>
            <Navbar />
            <section className='flex flex-col items-center'>
                <div className="heading flex flex-col gap-4 items-center mt-10 text-center mb-8">
                    <img src="/qrbuilder/download.jpeg" alt="anime-image" className='h-64 rounded-xl' />
                    <h1 className="font-playfair text-black text-center lg:text-[80px] text-[40px] leading-[5rem]">Let Make Your <span className='text-yellow-400 font-bold'>Menu</span></h1>
                    <p className='w-[70%]'><TypeWriter lp={1} content={["Take your dining experience to the next level with a digital menu that is easy to access, visually appealing, and effortlessly customizable. Say goodbye to printed menus and hello to a seamless, modern ordering experience!"]} /></p>
                </div>
                <div className='mt-2 mb-10'>
                    <Section />
                </div>
                <div className="relative w-[85%] md:w-[86%] p-[2px] rounded-3xl bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800">
                    <div className="w-full bg-white dark:bg-gray-900 rounded-3xl flex justify-center md:justify-normal flex-wrap">
                        <MenuItemCard />
                        <MenuItemCard />
                        <MenuItemCard />
                        <MenuItemCard />
                        <MenuItemCard />
                        <MenuItemCard />
                        <MenuItemCard />
                    </div>
                </div>

            </section>
            <Footer />
        </div>
    );
}

export default Page;
