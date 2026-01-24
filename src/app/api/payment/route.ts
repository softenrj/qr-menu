import Razorpay from "razorpay"
import { NextRequest } from "next/server"
import { verifyAuth } from "@/middleware/auth"
import { sendRJResponse } from "@/utils/api"
import { Cart } from "@/model/cart"
import { Order } from "@/model/order"
import { Transaction, TransactionStatus } from "@/model/transations"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req)
    const merchantId = req.nextUrl.searchParams.get("mid");

    if (!userId) {
      return sendRJResponse({
        success: false,
        message: "Unauthorized",
        status: 401,
      })
    }

    if (!merchantId) {
      return sendRJResponse({
        success: false,
        message: "Need Merchant Id",
        status: 400,
      })
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.item",
      select: "price title",
    })

    if (!cart || !cart.items.length) {
      return sendRJResponse({
        success: false,
        message: "Cart is empty",
        status: 400,
      })
    }

    const amount = cart.items.reduce((total: number, cartItem: any) => {
      return total + cartItem.item.price * cartItem.quantity
    }, 0)

    if (amount <= 0) {
      return sendRJResponse({
        success: false,
        message: "Invalid amount",
        status: 400,
      })
    }

    const order = await Order.create({
      userId,
      merchantId,
      items: cart.items.map((cartItem: any) => ({
        item: cartItem.item._id,
        quantity: cartItem.quantity,
      })),
      amount,
    })

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `ord_${Date.now()}`,
    })

    const transaction = await Transaction.create({
      userId,
      merchantId,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount,
      status: TransactionStatus.PENDING,
    })

    await razorpay.orders.edit(razorpayOrder.id, {
      notes: {
        transactionId: transaction._id,
        purpose: "checkout",
      },
    })

    return sendRJResponse({
      success: true,
      message: "Payment initiated successfully",
      data: razorpayOrder,
      status: 200,
    })
  } catch (error) {
    console.error("Error while payments:", error)
    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    })
  }
}
