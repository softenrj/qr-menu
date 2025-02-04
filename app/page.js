import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

function Home() {
  return (
    <div className="flex flex-col  bg-[url('/homepage/bg.png')] bg-cover bg-center bg-no-repeat h-screen">
      <Navbar />
      <main className="flex flex-col items-center justify-center  flex-grow-1 min-h-full text-center">
        <div className="font-playfair text-black text-center lg:text-[80px] text-[40px] leading-[5rem]">
          Make your Dhabha <br />
          <span className="text-yellow-500">Menu</span> <span className="font-bold">Online</span>
        </div>
        <p className="max-w-[600px]">Generate a QR code for your restaurant or dhaba menu instantly. Customers can scan to view the menu online—no app required!</p>
        <div className="button flex gap-5">
          <Link
            href="/Auth"
            className="bg-red-700 text-white px-8 py-4 rounded-[30px] font-dmSans relative top-[60px] transition duration-300 hover:bg-gray-900"
          >
            Get Start
          </Link>

          <Link href={'/'} 
          className="border-2 border-red-600 pt-4 px-8 rounded-[30px] text-black font-dmSans relative top-[60px] transition delay-300 duration-150 hover:border-blue-700"
          >Know more</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
