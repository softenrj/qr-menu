import { NextResponse } from "next/server";
import Order from "@/app/lib/model/orderItem";
import OrderHistory from "@/app/lib/model/orderHistory";
import { connectToDB } from "@/app/lib/DataBase";

export async function POST(req) {
  try {
    await connectToDB();
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Mark the order as completed
    order.status = "completed";

    // Create a record in OrderHistory
    const orderHistory = new OrderHistory({
      table: order.table,
      items: order.items,
      status: order.status,
      time: order.time,
      createdAt: order.createdAt, // preserve original creation time if desired
    });
    await orderHistory.save();

    // Remove the order from live orders
    await Order.findByIdAndDelete(orderId);

    return NextResponse.json(
      { message: "Order marked as done and moved to history", order: orderHistory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to mark order as done", details: error.message },
      { status: 500 }
    );
  }
}
