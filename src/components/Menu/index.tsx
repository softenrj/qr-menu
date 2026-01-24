"use client"

import React from "react"
import NavBar from "../common/NavBar"
import Footer from "../common/Footer"
import TypeWriter from "../common/TypeWritter"
import MenuBuilder from "./MenuBuilder"
import Link from "next/link"
import { useAppSelector } from "@/hook/redux"

const MenuBuilderPage: React.FC = () => {
    const userId = useAppSelector(state => state.merchant).merchant?._id;
    return (
        <div className="min-h-screen bg-[#F8F5F0]">
            <NavBar />

            <section className="relative overflow-hidden pt-24 pb-20">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[120px]" />
                    <div className="absolute top-40 right-10 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
                    <h1 className="font-playfair text-gray-900 font-extrabold leading-tight text-[42px] md:text-[72px]">
                        Build Your
                        <span className="relative mx-3 inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            Digital Menu
                            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                        </span>
                        in Minutes
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                        <TypeWriter
                            lp={false}
                            content={[
                                "Create a stunning digital menu that customers love. Easy to manage, beautiful to view, and always up to date — no printing required.",
                            ]}
                        />
                    </p>

                    <div className="mt-10 flex justify-center">
                        <span className="rounded-full bg-black/90 px-6 py-3 text-sm font-medium text-white shadow-lg">
                            ↓ Start building your menu
                        </span>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24">
                <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl p-6 md:p-10">
                    <MenuBuilder />
                </div>
            </section>

            <section className="relative mx-auto max-w-5xl px-6 pb-32">
                <div >

                    <div className="mx-auto max-w-2xl text-center space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Your menu is ready ✨
                        </h2>

                        <p className="text-gray-600 text-base md:text-lg">
                            Once you’ve added all your items, generate a QR code and share your
                            digital menu instantly with customers.
                        </p>

                        <div className="flex justify-center pt-4">
                            <Link
                                href={`/qr/${userId}`}
                                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-4 text-sm md:text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-2xl"
                            >
                                Generate QR Code
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 10 10"
                                    height="10"
                                    width="10"
                                    fill="none"
                                    className="stroke-white stroke-2 transition-transform group-hover:translate-x-1"
                                >
                                    <path d="M0 5h7" />
                                    <path d="M1 1l4 4-4 4" />
                                </svg>
                            </Link>
                        </div>

                        <p className="text-xs text-gray-400 pt-2">
                            You can edit your menu anytime later
                        </p>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    )
}

export default MenuBuilderPage
