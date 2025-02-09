import { connectToDB } from "@/app/lib/DataBase";
import Menu from "@/app/lib/model/Menu";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();

  try {
    const { id,section,image,originalPrice,price,title } = await req.json();

    const newItem = new Menu({
      id,
      section,
      image,
      originalPrice,
      price,
      title,
    });

    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding menu item" }, { status: 500 });
  }
}

export async function GET() {
  await connectToDB();

  try {
    const items = await Menu.find();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching menu items" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await connectToDB(); // ✅ Corrected to use await

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    let label;
    if (!id) {
      // Only parse JSON if ID is not provided
      const body = await req.json();
      label = body.label;
    }

    if (id) {
      // ✅ Fix: Use _id for MongoDB documents
      const deleteCard = await Menu.findOneAndDelete({id});

      if (!deleteCard) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
    }
    

    if (label) {
      // ✅ Fix: Correct way to delete all items under a section
      const deleteAll = await Menu.deleteMany({ section: label });

      if (deleteAll.deletedCount === 0) {
        return NextResponse.json({ error: "No items found under this section" }, { status: 202 });
      }

      return NextResponse.json({ message: "Section and all related items deleted" }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid request: Provide either 'id' or 'label'" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to delete Card", details: error.message }, { status: 500 });
  }
}
