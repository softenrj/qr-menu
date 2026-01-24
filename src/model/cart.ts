import mongoose, { Schema, Document } from "mongoose";
export type ICartItem = {
    item: mongoose.Types.ObjectId; 
    quantity: number;
}

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const cartSchema = new Schema<ICart>({
    userId: {  type: mongoose.Schema.Types.ObjectId,  ref: "merchants", required: true },
    items: [{
        item: {  type: mongoose.Schema.Types.ObjectId,  ref: "menus", required: true },
        quantity: {  type: Number,  required: true,  min: [1, "Quantity cannot be less than 1"], default: 1 }
    }]
}, { 
    timestamps: true
});

export const Cart = mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);