import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  section: String,
  image: String,
  title: String,
  price: Number,
  originalPrice: Number,
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
