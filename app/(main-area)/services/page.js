import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Poster from '@/components/service-poster';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ServiceCard from '@/components/ServiceCard';
import TypeWriter from '@/components/TypeWriter';

export default function DashBoard() {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen flex flex-col items-center px-4 md:px-12">
                <div className="content mt-24 md:mt-36 w-full max-w-6xl md:flex">
                    <div className="w-full md:w-[40%] flex">
                        <Poster />
                    </div>
                    <div className="md:w-[60%] flex flex-col items-center">
                        <h1 className="text-5xl font-bold text-center mt-8 w-full">
                            Elevating Your Experience with
                            <span className="text-blue-600 transition duration-700 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                                <TypeWriter content={[
                                    " Outstanding Services",
                                    " Superb Services",
                                    " Superior Services",
                                    " Excellent Services",
                                    " Top-notch Services",
                                    " First-rate Services",
                                    " Unmatched Services",
                                    " High-quality Services",
                                    " Premium Services",
                                    " Extraordinary Services",
                                    " Exemplary Services",
                                    " World-class Services",
                                    " Remarkable Services",
                                    " Unparalleled Services",
                                    " Unbeatable Services"
                                ]}/>
                            </span>


                        </h1>

                        <hr className="border-4 border-dotted border-b-0 w-[80%] mt-1" />
                        <p className="w-[76%] text-center mt-5 font-playfair">
                            QR Menu Generator allows restaurants and dhabas to create digital menus with a scannable QR code.
                            Customers can easily access the menu by scanning the code, eliminating the need for printed menus.
                            Our platform offers easy menu customization, real-time updates, and a seamless user experience.
                        </p>
                        <div className="features mt-10 font-bold self-start ml-28">
                            <p className='text-blue-600 text-xl font-dmSans'><QrCodeIcon fontSize='large' className='text-gray-950 mr-2' /> Instant QR generate</p>
                            <p className='text-blue-600 text-xl font-dmSans mt-5'><AccessTimeIcon fontSize='large' className='text-gray-950 mr-2' /> RealTime Information</p>
                            <p className='text-blue-600 text-xl font-dmSans mt-5'><CurrencyRupeeIcon fontSize='large' className='text-gray-950 mr-2' /> Integrated Payment</p>
                            <p className='text-blue-600 text-xl font-dmSans mt-5'><PictureAsPdfIcon fontSize='large' className='text-gray-950 mr-2' /> Menu Pamphlet</p>
                        </div>
                    </div>
                </div>

                <div className='mt-36 flex flex-col items-center'>
                    <div className="heading">
                        <span className='text-4xl font-bold text-blue-600 relative
                        before:absolute before:bg-red-400 before:right-full before:top-1/2 before:h-1 before:w-[7em] before:rounded-full
                        after:absolute after:bg-red-400 after:left-full after:top-1/2 after:w-[7em] after:h-1
                        '>Avalable Services</span>
                    </div>
                    <div>
                        <ServiceCard />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
