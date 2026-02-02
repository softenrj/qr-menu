import { verifyAuth } from "@/middleware/auth";
import { Cart, ICartItem } from "@/model/cart";
import { sendRJResponse } from "@/utils/api";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const merchantId = await verifyAuth(req);

        if (!merchantId) {
            return sendRJResponse({
                success: false,
                message: "Unauthorized",
                status: 401,
            });
        }

        const cartData = await Cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(merchantId as any) } },
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "menus",
                    localField: "items.item",
                    foreignField: "_id",
                    as: "menuDetails"
                }
            },
            { $unwind: "$menuDetails" },
            {
                $project: {
                    _id: "$menuDetails._id",
                    merchantId: "$menuDetails.merchantId",
                    title: "$menuDetails.title",
                    price: "$menuDetails.price",
                    image: "$menuDetails.image",
                    quantity: "$menuDetails.quantity",
                    section: "$menuDetails.section",
                    itemCount: "$items.quantity", 
                    createdAt: "$menuDetails.createdAt",
                    updatedAt: "$menuDetails.updatedAt"
                }
            }
        ]);
        return sendRJResponse({
            success: true,
            message: "cart fetched successfully",
            data: cartData,
            status: 200,
        });
    } catch (error) {
        console.error("Error while fetching cart:", error);

        return sendRJResponse({
            success: false,
            message: "Internal server error",
            status: 500,
        });
    }
}


export async function POST(req: NextRequest) {
    try {
        const userId = await verifyAuth(req);

        const { itemId, quantity } = await req.json();

        if (!userId) {
            return sendRJResponse({ success: false, message: "Unauthorized", status: 401 });
        }

        if (!itemId) {
            return sendRJResponse({ success: false, message: "Invalid Item or Quantity", status: 400 });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [{ item: itemId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (p: ICartItem) => p.item.toString() === itemId
            );

            if (itemIndex > -1) {
                if (quantity !== 0) {
                    cart.items[itemIndex].quantity = quantity;
                } else {
                    cart.remove(cart.items[itemIndex]);
                }
            } else {
                cart.items.push({ item: itemId, quantity });
            }

            await cart.save();
        }

        return sendRJResponse({
            success: true,
            message: "Cart updated successfully",
            data: cart,
            status: 200,
        });

    } catch (error) {
        console.error("Error while modifying cart:", error);
        return sendRJResponse({ success: false, message: "Internal server error", status: 500 });
    }
}