import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    label: { type: String, required: true },
})

export default mongoose.models.SectionDB || mongoose.model("SectionDB",SectionSchema);