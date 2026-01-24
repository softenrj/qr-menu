"use client"

import { useAppDispatch, useAppSelector } from "@/hook/redux"
import { addCheckOutItem, decrementCheckOutItem, incrementCheckOutItem, syncCartWithDB } from "@/store/reducer/checkout"
import { IMenu } from "@/types/menu"
import Image from "next/image"
import React from "react"

function MenuItem({ item }: { item: IMenu }) {
  const dispatch = useAppDispatch()

  const checkout = useAppSelector(state => state.checkOut)
  const checkoutItem = checkout.find(_i => _i._id === item._id)

  const qty = checkoutItem?.itemCount ?? 0

  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100
        )
      : null

  const handleUpdate = (newQty: number) => {
      console.log(qty, newQty)

    if (newQty > qty) {
      dispatch(addCheckOutItem(item))
    } else {
      dispatch(decrementCheckOutItem(String(item._id)))
    }

    dispatch(syncCartWithDB({ itemId: String(item._id), quantity: newQty }))

  }

  return (
    <div className="w-39 sm:w-44 md:w-48 rounded-2xl bg-white p-3 shadow-sm hover:shadow-md transition">

      <div className="relative h-28 w-full rounded-xl overflow-hidden">
        <Image
          alt="Menu item"
          fill
          crossOrigin="anonymous"
          src={item.image}
          className="object-cover"
        />

        {discount && (
          <span className="absolute top-1 left-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500">
          1 pc • {item.quantity} g
        </p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {item.originalPrice && (
              <span className="text-xs line-through text-gray-500">
                ₹{item.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold text-gray-900">
              ₹{item.price}
            </span>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => handleUpdate(1)}
              className="rounded-lg border border-green-600 px-3 py-1 text-xs font-semibold text-green-600 hover:bg-green-50"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-green-600 px-2 py-1 text-green-600">
              <button
                onClick={() => handleUpdate(qty-1)}
                className="text-sm font-bold"
              >
                −
              </button>
              <span className="text-xs font-semibold">{qty}</span>
              <button
                onClick={() => handleUpdate(qty+1)}
                className="text-sm font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuItem
