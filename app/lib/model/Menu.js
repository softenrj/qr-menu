import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  id: String,
  section: String,
  image: String,
  originalPrice: String,
  price: String,
  title: String,
});

export default mongoose.models.Menu || mongoose.model("Menu", MenuItemSchema);
