import { NextResponse } from "next/server";
import Order from "@/app/lib/model/orderItem";
import OrderHistory from "@/app/lib/model/orderHistory";
import { connectToDB } from "@/app/lib/DataBase";

// Fetch all live orders
export async function GET() {
  try {
    await connectToDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders", details: error.message },
      { status: 500 }
    );
  }
}

// Create a new order
export async function POST(req) {
  try {
    await connectToDB();
    const { table, items, status, total_Amount } = await req.json();

    if (!table || !items.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = new Order({
      table,
      items,
      total_Amount,
      status,
      time: new Date().toLocaleTimeString(),
    });

    await newOrder.save();
    return NextResponse.json(
      { message: "Order placed successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
