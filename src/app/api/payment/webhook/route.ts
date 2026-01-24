import crypto from "crypto"
import { NextRequest } from "next/server"
import { Transaction, TransactionStatus } from "@/model/transations"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("x-razorpay-signature")!

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex")

  if (expectedSignature !== signature) {
    return new Response("Invalid signature", { status: 400 })
  }

  const payload = JSON.parse(body)
  const event = payload.event

  if (event === "payment.failed") {
    const razorpayOrderId = payload.payload.payment.entity.order_id

    await Transaction.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: TransactionStatus.FAILED,
        failureReason: payload.payload.payment.entity.error_description,
        gatewayResponse: payload,
      }
    )
  }

  if (event === "payment.captured") {
    const razorpayOrderId = payload.payload.payment.entity.order_id
    const paymentId = payload.payload.payment.entity.id

    await Transaction.findOneAndUpdate(
      { razorpayOrderId },
      {
        status: TransactionStatus.COMPLETED,
        razorpayPaymentId: paymentId,
        gatewayResponse: payload,
      }
    )
  }

  return new Response("OK", { status: 200 })
}
