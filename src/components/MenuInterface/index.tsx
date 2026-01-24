"use client"

import React from "react"
import Image from "next/image"
import NavBar from "../common/NavBar"
import Footer from "../common/Footer"
import { ReactLenis } from "lenis/react"
import MenuSection from "./MenuSection"
import ItemNotch from "./ItemNotch"
import { getApi } from "@/utils/common"
import { ApiResponse } from "@/utils/api"
import { CONSUMER_MENU } from "@/utils/APIConstant"
import { IMenu } from "@/types/menu"
import { syncCartToCheckOut } from "@/store/reducer/checkout"
import { useAppDispatch } from "@/hook/redux"

function MerchantPage({ merchantId }: { merchantId: string }) {
  const [menu, setMenu] = React.useState<IMenu[]>([])
  const dispatch = useAppDispatch();

  const menuItem = React.useMemo(() => {
    const map = new Map<string, IMenu[]>()

    for (const item of menu) {
      if (!map.has(item.section)) {
        map.set(item.section, [])
      }
      map.get(item.section)!.push(item)
    }

    return map
  }, [menu])

  const fetchMenu = async () => {
    const response = await getApi<ApiResponse<IMenu[]>>({
      url: CONSUMER_MENU + `?merchantId=${merchantId}`,
    })

    if (response) {
      setMenu(response.data)
    }
  }

  React.useEffect(() => {
    fetchMenu()
  }, [merchantId])

  React.useEffect(() => {
    dispatch(syncCartToCheckOut({ dispatch: dispatch }));
  },[])


  return (
    <>
      <ReactLenis root>
        <div className="min-h-screen bg-[#F8F5F0]">
          <NavBar />

          {/* HERO */}
          <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768652991/2148200773_slxpzw.jpg"
                alt="Hero background"
                fill
                priority
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-3xl">
              <p className="mb-4 inline-block rounded-full bg-white/10 px-5 py-2 text-sm tracking-wide text-white backdrop-blur-md">
                Curated • Fresh • Crafted
              </p>

              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white">
                Explore Our Menus
              </h1>

              <p className="mt-3 text-lg text-white/80">
                Discover handcrafted dishes made with premium ingredients and bold flavors.
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="relative -top-12 rounded-t-4xl bg-[#F8F5F0] p-8">
            <h1 className="mb-6 text-center text-3xl md:text-6xl font-serif font-bold text-slate-950">
              What's your Mood
            </h1>

            {Array.from(menuItem.entries()).map(([section, items]) => (
              <MenuSection
                key={section}
                section={section}
                items={items}
              />
            ))}
          </div>

          <Footer />
        </div>
      </ReactLenis>

      <ItemNotch />
    </>
  )
}

export default MerchantPage
