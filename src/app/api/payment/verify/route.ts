import { verifyAuth } from "@/middleware/auth"
import { NextRequest } from "next/server"
import crypto from "crypto"
import { sendRJResponse } from "@/utils/api"
import { Order } from "@/model/order"
import { Transaction, TransactionStatus } from "@/model/transations"
import { Cart } from "@/model/cart"

export async function POST(req: NextRequest) {
  try {
    const userId = await verifyAuth(req)
    if (!userId) {
      return sendRJResponse({ success: false, message: "Unauthorized", status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return sendRJResponse({
        success: false,
        message: "Invalid payment payload",
        status: 400,
      })
    }

    const transaction = await Transaction.findOne({
      razorpayOrderId: razorpay_order_id,
      userId,
    })

    if (!transaction) {
      return sendRJResponse({
        success: false,
        message: "Transaction not found",
        status: 404,
      })
    }

    if (transaction.status === TransactionStatus.COMPLETED) {
      return sendRJResponse({
        success: true,
        message: "Payment already verified",
        status: 200,
      })
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      transaction.status = TransactionStatus.FAILED
      transaction.failureReason = "Signature mismatch"
      transaction.gatewayResponse = { razorpay_order_id, razorpay_payment_id }
      await transaction.save()

      return sendRJResponse({
        success: false,
        message: "Payment verification failed",
        status: 400,
      })
    }

    transaction.status = TransactionStatus.COMPLETED
    transaction.razorpayPaymentId = razorpay_payment_id
    transaction.gatewayResponse = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }
    await transaction.save()

    await Order.findByIdAndUpdate(transaction.orderId, {
      paymentStatus: "PAID",
    })

    await Cart.deleteOne({ userId })

    return sendRJResponse({
      success: true,
      message: "Payment verified successfully",
      status: 200,
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    })
  }
}
