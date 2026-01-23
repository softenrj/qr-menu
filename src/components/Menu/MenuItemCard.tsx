"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { deleteApi } from "@/utils/common"
import { ApiResponse } from "@/utils/api"
import { IMenu } from "@/model/menu"
import { REMOVE_ITEM } from "@/utils/APIConstant"

interface MenuItemCardProps {
  id: string
  deleteCard: (id: string) => void
  image: string
  title: string
  quantity: number
  price: number
  originalPrice?: number
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  deleteCard,
  image,
  title,
  price,
  quantity,
  originalPrice,
}) => {
  const [deleting, setDeleting] = useState(false)

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null

  const handleDelete = async () => {
    if (deleting) return

    try {
      setDeleting(true)
      toast.loading("Deleting item...", { id: "delete-item" })

      const res = await deleteApi<ApiResponse<IMenu>>({
        url: REMOVE_ITEM,
        param: { id },
      })

      if (!res?.success) {
        throw new Error(res?.message)
      }

      deleteCard(id)
      toast.success("Item deleted", { id: "delete-item" })
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to delete item",
        { id: "delete-item" }
      )
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="group relative m-5 w-56 md:w-72 overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative mx-3 mt-3 h-40 md:h-64 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {discount && (
          <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-700 hover:text-red-600 transition disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="px-4 pb-4 pt-3">
        <h5 className="text-base font-semibold truncate">{title}</h5>
        <div className="mt-2 flex items-center gap-2">
          <p
            className="cursor-pointer text-xs text-gray-500"
          >
            1 pc • {quantity} g
          </p>
          <span className="text-xl font-bold">₹{price}</span>
          {originalPrice && (
            <span className="text-sm line-through text-gray-500">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard
