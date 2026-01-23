"use client"
import React from "react"
import NavBar from "../common/NavBar"
import TypeWriter from "../common/TypeWritter"
import Footer from "../common/Footer"
import { Dock, IndianRupee, QrCodeIcon, Timer } from "lucide-react"
import Image from "next/image"
import ServiceCard from "./ServiceCard"
import Banners from "./Banners"
import ReactLenis from "lenis/react"

export default function Service() {
    return (
        <ReactLenis root>
            <div className="bg-gradient-to-b from-[#f9fafb] via-[#f5f7ff] to-[#ffffff]">
                <NavBar />

                <main className="max-w-7xl mx-auto px-8 md:px-12 pt-28">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

                        <div className="flex gap-6 w-full">
                            <div className="relative h-[34rem] w-1/2 rounded-3xl overflow-hidden shadow-2xl backdrop-blur bg-white/40">
                                <Image
                                    src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768741655/poster-1_fivfye.jpg"
                                    alt="QR Menu"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-col gap-6 w-1/2">
                                <div className="relative h-[16rem] w-full rounded-3xl overflow-hidden shadow-xl bg-white/40">
                                    <Image
                                        src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768741655/poster-2_gzpsng.png"
                                        alt="Digital Menu"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="relative h-[16rem] w-full rounded-3xl overflow-hidden shadow-xl bg-white/40">
                                    <Image
                                        src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768741656/poster-3_nt8vku.png"
                                        alt="Restaurant QR"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Elevating Your Experience with
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    <TypeWriter
                                        content={[
                                            "Outstanding Services",
                                            "Premium Services",
                                            "World-class Services",
                                            "Unmatched Services",
                                            "Top-notch Services",
                                        ]}
                                    />
                                </span>
                            </h1>

                            <p className="text-gray-600 text-lg max-w-xl">
                                QR Menu Generator helps restaurants and dhabas create modern,
                                digital menus using scannable QR codes. Update items instantly,
                                reduce costs, and deliver a smooth dining experience.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <Feature icon={<QrCodeIcon />} text="Instant QR Generation" />
                                <Feature icon={<Timer />} text="Real-time Menu Updates" />
                                <Feature icon={<IndianRupee />} text="Integrated Payments" />
                                <Feature icon={<Dock />} text="Digital Menu Pamphlet" />
                            </div>
                        </div>
                    </section>

                    <section className="mt-32 text-center">
                        <h2 className="text-3xl font-bold inline-block relative">
                            Available Services
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                        </h2>

                        <div className="mt-14">
                            <ServiceCard />
                        </div>
                    </section>

                    <Banners />
                </main>

                <Footer />
            </div>
        </ReactLenis>
    )
}

function Feature({
    icon,
    text,
}: {
    icon: React.ReactNode
    text: string
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl border bg-white/70 backdrop-blur px-4 py-3 shadow-sm hover:shadow-md transition">
            <span className="text-blue-600">{icon}</span>
            <span className="font-medium text-gray-800">{text}</span>
        </div>
    )
}
