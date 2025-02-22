import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    table: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    total_Amount: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
