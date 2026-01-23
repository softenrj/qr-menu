"use client"
import React from 'react'
import BentoBox from './BentoBox'
import OrderTrackingChart from './OrderTraker'
import PopularItemsCard from './PopularItemCard'

function index() {
  return (
    <div>
        <BentoBox />
        <div className="grid grid-cols-12 gap-6 w-full">
  <div className="col-span-12 xl:col-span-8">
    <OrderTrackingChart />
  </div>

  <div className="col-span-12 xl:col-span-4">
    <PopularItemsCard />
  </div>
</div>

    </div>
  )
}

export default index