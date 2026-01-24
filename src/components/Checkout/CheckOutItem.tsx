"use client"

import { useAppDispatch } from "@/hook/redux"
import {
  CheckOutItems,
  decrementCheckOutItem,
  incrementCheckOutItem,
  removeCheckItem,
  syncCartWithDB,
} from "@/store/reducer/checkout"
import Image from "next/image"
import React from "react"

function CheckOutItem({ item }: { item: CheckOutItems }) {
  const dispatch = useAppDispatch()
  const qty = item.itemCount

  const handleUpdate = (newQty: number) => {
    if (newQty < 1) {
      dispatch(removeCheckItem(String(item._id)))
      dispatch(syncCartWithDB({ itemId: String(item._id), quantity: 0 }))
      return
    }

    if (newQty > qty) {
      dispatch(incrementCheckOutItem(String(item._id)))
    } else {
      dispatch(decrementCheckOutItem(String(item._id)))
    }

    dispatch(
      syncCartWithDB({
        itemId: String(item._id),
        quantity: newQty,
      })
    )
  }

  return (
    <div className="flex w-full gap-4 rounded-2xl bg-white p-3 shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          alt={item.title}
          fill
          src={item.image}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            1 pc • {item.quantity} g
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            ₹{item.price * qty}
          </span>

          {/* Quantity Control */}
          <div className="flex items-center gap-3 rounded-lg border border-green-600 px-2 py-1 text-green-600">
            <button
              onClick={() => handleUpdate(qty - 1)}
              className="text-sm font-bold"
            >
              −
            </button>

            <span className="text-xs font-semibold">{qty}</span>

            <button
              onClick={() => handleUpdate(qty + 1)}
              className="text-sm font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutItem
