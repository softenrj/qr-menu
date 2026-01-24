"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "QR Menu – Scan & Explore",
    description:
      "No more paper menus. Customers can instantly scan a QR code to explore your full digital menu with images and details.",
    imgSrc:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768656837/original-e8270706177487165a27c6ae895aa842_oxioc5.webp",
    link: "/menu",
  },
  {
    title: "Download Menu Pamphlet",
    description:
      "Let customers download your digital menu and share it anytime, anywhere — perfect for promotions and repeat visits.",
    imgSrc:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663966/qr-code-interactive-digital-menu_c7vovg.webp",
    link: "#",
  },
  {
    title: "Real-Time Order History",
    description:
      "Customers can quickly view past orders and reorder their favorite meals with ease.",
    imgSrc:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663740/0fa73dbd-3ac8-4492-b4dd-e1789e304c4f-cover_grmypr.png",
    link: "/dashboard/transactionhistory",
  },
]


const ServiceCard = () => {
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
      {services.map((service, index) => (
        <div
          key={index}
          className="group relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={service.imgSrc}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              crossOrigin="anonymous"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>

          <div className="p-6 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-gray-900">
              {service.title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {service.description}
            </p>

            <Link
              href={service.link}
              className="mt-2 inline-flex items-center gap-2 w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition"
            >
              Explore
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-blue-500/30 transition" />
        </div>
      ))}
    </div>
  )
}

export default ServiceCard
