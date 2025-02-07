import { NextResponse } from "next/server";
import connectToDatabase from  "@/app/lib/DataBase";
import MenuItem from "@/models/Menu";

// GET: Fetch all menu items
export async function GET() {
  await connectToDatabase();
  const menuItems = await MenuItem.find({});
  return NextResponse.json(menuItems);
}

// POST: Add new menu item
export async function POST(req) {
  await connectToDatabase();
  const { section, image, title, price, originalPrice } = await req.json();

  const newMenuItem = new MenuItem({ section, image, title, price, originalPrice });
  await newMenuItem.save();

  return NextResponse.json(newMenuItem, { status: 201 });
}

// DELETE: Remove an item by ID
export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  await MenuItem.findByIdAndDelete(id);
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
