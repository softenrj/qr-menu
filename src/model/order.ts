import mongoose from "mongoose";
import { ICartItem } from "./cart";

export interface IOrder {
    _id: mongoose.Types.ObjectId;
    merchantId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "merchants" },
    merchantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "merchants" },
    items: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: "menus", required: true },
        quantity: { type: Number, required: true, min: [1, "Quantity cannot be less than 1"], default: 1 }
    }],
    amount: { type: Number, required: true, min: 0 },
}, { timestamps: true })

export const Order =
  mongoose.models.orders || mongoose.model<IOrder>("orders", orderSchema);
