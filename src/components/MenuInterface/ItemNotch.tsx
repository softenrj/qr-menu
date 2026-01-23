"use client"

import React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { CheckOutItems } from "@/store/reducer/checkout"
import { useAppSelector } from "@/hook/redux"
import { usePathname, useRouter } from "next/navigation"
import AuthDialog from "../Auth"
import { IROLE } from "@/types/role"

function ItemNotch() {
  const router = useRouter()
  const pathname = usePathname()

  const checkoutItems: CheckOutItems[] =
    useAppSelector((state) => state.checkOut)

  const user = useAppSelector((state) => state.merchant)

  const [open, setOpen] = React.useState<boolean>(false)

  const onClose = () => setOpen(false)

  React.useEffect(() => {
    setOpen(!user.merchant)
  }, [user.merchant])

  if (checkoutItems.length === 0) return null

  const totalCount = checkoutItems.reduce(
    (sum, item) => sum + item.itemCount,
    0
  )

  const visibleItems = checkoutItems.slice(0, 2)
  const extraCount = checkoutItems.length - visibleItems.length

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        onClick={() =>
          router.push(`${pathname}/checkout/342424242423`)
        }
      >
        <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-xl ring-1 ring-black/5">

          {/* Avatars */}
          <div className="flex -space-x-3">
            {visibleItems.map((item) => (
              <Avatar
                key={item._id}
                className="h-10 w-10 border-2 border-white"
              >
                <AvatarImage src={item.image} />
                <AvatarFallback>
                  {item.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}

            {extraCount > 0 && (
              <Avatar className="h-10 w-10 border-2 border-white bg-gray-200 text-gray-700">
                <AvatarFallback>
                  +{extraCount}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {/* Text */}
          <div className="w-full text-xs">
            <p className="font-medium text-gray-900 leading-tight">
              Added to cart
            </p>
            <p className="text-gray-500 line-clamp-1">
              {checkoutItems[0].title}
            </p>
          </div>

          <Badge>{totalCount}</Badge>
        </div>
      </motion.div>

      <AuthDialog
        role={IROLE.CONSUMER}
        open={open}
        redirect={false}
        onClose={onClose}
      />
    </>
  )
}

export default ItemNotch
