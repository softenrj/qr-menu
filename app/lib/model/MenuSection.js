// models/MenuSection/route.js
import mongoose from "mongoose";

const MenuSectionSchema = new mongoose.Schema({
  label: String,
  notification: { type: Number, default: 0 },
  items: [
    {
      img: String,
      title: String,
      price: Number,
      originalPrice: Number,
    },
  ],
});

export default mongoose.models.MenuSection ||
  mongoose.model("MenuSection", MenuSectionSchema);
