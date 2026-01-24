import mongoose, { Schema } from "mongoose";

export enum TransactionStatus {
  PENDING = "PENDING",
  FAILED = "FAILED",
  COMPLETED = "COMPLETED",
}


export interface ITransaction {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  merchantId: mongoose.Types.ObjectId
  orderId: mongoose.Types.ObjectId
  razorpayOrderId: string
  razorpayPaymentId?: string
  amount: number
  status: TransactionStatus
  failureReason?: string
  gatewayResponse?: any
  createdAt: Date
  updatedAt: Date
}


const TransactionSchema = new mongoose.Schema<ITransaction>({
    userId: { type: mongoose.Schema.ObjectId, required: true, ref: "merchants" },
    merchantId: { type: mongoose.Schema.ObjectId, required: true, ref: "merchants" },
    orderId: { type: mongoose.Schema.ObjectId, required: true, ref: "orders" },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: Object.values(TransactionStatus), default: TransactionStatus.PENDING },
    failureReason: { type: String },
    gatewayResponse: { type: Schema.Types.Mixed }
}, { timestamps: true })

export const Transaction =  
mongoose.models.transaction || mongoose.model<ITransaction>("transaction", TransactionSchema)