// pages/api/menuSections/route.js
import connectDb from "../../lib/mongodb";
import MenuSection from "../../models/MenuSection";

export async function handler(req, res) {
  await connectDb();

  if (req.method === "GET") {
    try {
      const sections = await MenuSection.find();
      res.status(200).json(sections);
    } catch (error) {
      res.status(500).json({ message: "Error fetching menu sections" });
    }
  }

  if (req.method === "POST") {
    try {
      const { label, notification, items } = req.body;

      const newSection = new MenuSection({
        label,
        notification,
        items,
      });

      await newSection.save();
      res.status(201).json(newSection);
    } catch (error) {
      res.status(500).json({ message: "Error adding menu section" });
    }
  }
}

export default handler;
