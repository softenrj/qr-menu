"use client"

import { useAppSelector } from "@/hook/redux"
import { CheckOutItems } from "@/store/reducer/checkout"
import React from "react"
import CheckOutItem from "./CheckOutItem"

function CheckoutPage() {
  const checkout: CheckOutItems[] = useAppSelector(state => state.checkOut)

  if (checkout.length === 0) {
    return (
      <div className="px-6 pt-20 text-center text-gray-500">
        Your cart is empty
      </div>
    )
  }

  const originalTotal = checkout.reduce(
    (sum, item) =>
      sum +
      (item.originalPrice ?? item.price) * item.itemCount,
    0
  )

  const discountedTotal = checkout.reduce(
    (sum, item) => sum + item.price * item.itemCount,
    0
  )

  const savings = originalTotal - discountedTotal

  return (
    <div className="relative min-h-screen bg-gray-50 px-6 pt-20">

      <h1 className="mb-4 font-mono text-2xl text-zinc-950">
        Checkout
      </h1>

      {/* Items */}
      <div className="mb-32 flex flex-col gap-3">
        {checkout.map((item) => (
          <CheckOutItem key={String(item._id)} item={item} />
        ))}
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-6 py-4 shadow-lg">

        <div className="mb-3 space-y-1 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Item total</span>
            <span className="line-through">₹{originalTotal}</span>
          </div>

          <div className="flex justify-between font-medium text-green-600">
            <span>Just for you</span>
            <span>₹{discountedTotal}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between text-xs text-green-600">
              <span>You saved</span>
              <span>₹{savings}</span>
            </div>
          )}
        </div>

        <button className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">
          Place Order • ₹{discountedTotal}
        </button>
      </div>
    </div>
  )
}

export default CheckoutPage
