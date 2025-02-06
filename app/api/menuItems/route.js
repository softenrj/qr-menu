// pages/api/menuItems/route.js
import connectDb from "../../lib/mongodb";
import MenuItem from "../../models/MenuItem";

export async function handler(req, res) {
  await connectDb();

  if (req.method === "POST") {
    try {
      const { img, title, price, originalPrice } = req.body;

      const newItem = new MenuItem({
        img,
        title,
        price,
        originalPrice,
      });

      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding menu item" });
    }
  }

  if (req.method === "GET") {
    try {
      const items = await MenuItem.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu items" });
    }
  }
}

export default handler;
