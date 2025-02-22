import mongoose from "mongoose";

const VisitorUsersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    lastActive: { type: Date, default: Date.now }
});

export default mongoose.models.VisitorUsers || mongoose.model("VisitorUsers", VisitorUsersSchema);
