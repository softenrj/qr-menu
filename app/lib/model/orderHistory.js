import mongoose from "mongoose";

const OrderHistorySchema = new mongoose.Schema({
    table: String,
    items: [String],
    status: String, // completed | canceled
    time: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.OrderHistory || mongoose.model("OrderHistory", OrderHistorySchema);
