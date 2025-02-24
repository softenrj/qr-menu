import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const services = [
    {
        title: "QR Menu - Scan & Explore",
        description: "No more paper menus! Customers can simply scan a QR code to access your full menu digitally, complete with images and details.",
        imgSrc: "/serviceTab/s-2.jpg",
        link: "/menuBuilder"
    },
    {
        title: "Download Pamphlet",
        description: "Allow customers to download a digital version of your menu, so they can explore your offerings anytime and share with others.",
        imgSrc: "/serviceTab/s-1.jpg",
        link: "#"
    },
    {
        title: "Real-Time Order History",
        description: "Give customers instant access to their past orders, making it easy to track previous meals and reorder their favorites effortlessly.",
        imgSrc: "/serviceTab/s-3.jpg",
        link: "/dashboard/transactionhistory"
    },
];



const ServiceCard = () => {
    return (
        <div className=" mt-24 flex flex-wrap justify-center gap-6 mb-12">
            {services.map((service, index) => (
                <div
                    key={index}
                    className="w-full md:basis-1/2 lg:w-1/2 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="h-72 max-h-72">
                        <Image
                            className="w-full h-full object-cover rounded-t-lg"
                            src={service.imgSrc}
                            alt={service.title}
                            width={600}
                            height={300}
                            loading="lazy"
                        />
                    </div>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {service.title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {service.description}
                        </p>
                        <Link
                            href={service.link}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Go to page
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default ServiceCard;
