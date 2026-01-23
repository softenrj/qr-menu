"use Client"
import React from 'react'

function PricingSection() {
    return (
        <div className='bg-[#F8F5F0] flex flex-col items-center p-12 pt-12'>
            <h2 className="font-playfair text-[36px] md:text-[50px] lg:text-[64px] italic leading-[1.1] text-[#1e1b168e] font-semibold">
                All This 
                <span className="text-[#a18d6dbb]"> For</span>
            </h2>
            <h1 className='text-[#cdbca4] font-playfair text-[48px] md:text-[54px] lg:text-[64px] font-bold'>Free</h1>
        </div>
    )
}

export default PricingSection