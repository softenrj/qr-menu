"use client"

import React from "react"
import MenuItem from "./MenuItem"
import { IMenu } from "@/types/menu"

function MenuSection({section,items}:{ section: string, items: IMenu[]}) {
  return (
    <section className="w-full py-4">
      
      <h2 className="mb-3 px-3 text-base font-semibold text-gray-900">
        {section}
      </h2>

      <div className="flex gap-4 overflow-x-auto px-3 pb-2 snap-x snap-mandatory scrollbar-hide">
        {items.map((item, idx) => (
          <div key={idx} className="snap-start">
            <MenuItem item={item} />
          </div>
        ))}
      </div>

    </section>
  )
}

export default MenuSection
