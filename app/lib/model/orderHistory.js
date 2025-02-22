import mongoose from "mongoose";

const OrderHistorySchema = new mongoose.Schema({
    table: String,
    items: [
        {
            name: String,
            quantity: Number
        }
    ],
    status: String, // completed | canceled
    time: String,
    total_Amount: Number,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.OrderHistory || mongoose.model("OrderHistory", OrderHistorySchema);
