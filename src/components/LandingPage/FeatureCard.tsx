"use client"
import React from 'react'
import Image from "next/image"
import { motion } from "framer-motion" 
import { MenuFeatures } from '@/types/MenuFeatures'

function FeatureCard({ feature }: { feature: MenuFeatures }) {
    const Icon = feature.icon
    return (
        <div className="relative w-screen shrink-0 mt-18 md:mt=0 px-6 md:px-20 flex items-center justify-center">
            <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                    >
                        <span className="inline-block mb-4 rounded-full bg-[#A18D6D]/10 px-4 py-1 text-sm text-[#A18D6D] font-medium uppercase tracking-wider">
                            Smart Menu System
                        </span>

                        <h2 className="font-playfair text-[38px] md:text-[50px] lg:text-[64px] leading-[1.1] text-[#1E1B16] font-semibold">
                            {feature.title[0] } <br />
                            <span className="text-[#A18D6D]">{feature.title[1]}</span> {feature.title[2]}
                        </h2>

                        <p className="mt-6 text-[#6F624E] text-lg md:text-xl leading-relaxed max-w-md">
                            {feature.description}
                        </p>

                        <ul className="mt-8 space-y-4 text-[#1E1B16] font-medium">
                            {feature.featureList.map((item, idx) => (
                                <motion.li 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="flex items-center gap-4"
                                >
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#A18D6D]" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 2 }} 
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-[#A18D6D]/5 rounded-[40px] -rotate-2" />
                        
                        <div className="relative h-[350px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                            <Image
                                src={feature.image}
                                alt="Dynamic QR Menu"
                                fill
                                priority
                                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {Icon &&
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"/>
                                <div className="text-sm font-bold text-[#1E1B16]">
                                    {feature.iconTitle}<br/>
                                    <span className="text-xs font-normal text-gray-500">{feature.iconSubTitle}</span>
                                </div>
                            </div>
                        </motion.div>}
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default FeatureCard