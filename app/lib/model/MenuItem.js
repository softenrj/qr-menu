// models/MenuItem/route.js
import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  img: String,
  title: String,
  price: Number,
  originalPrice: Number,
});

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", MenuItemSchema);
