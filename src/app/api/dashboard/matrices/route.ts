import { verifyAuth } from "@/middleware/auth";
import { Order } from "@/model/order";
import { Transaction, TransactionStatus } from "@/model/transations";
import { sendRJResponse } from "@/utils/api";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

const getOrders = async (merchantId: mongoose.Types.ObjectId) => {
    try {
        const orderes = await Order.countDocuments({ merchantId });
        return orderes;
    } catch (error) {
        console.error("Error while getting orderes");
    }
}

const getRevenue = async (merchantId: mongoose.Types.ObjectId) => {
    try {
        const revenue = await Transaction.aggregate([
            { $match: { status: TransactionStatus.COMPLETED, merchantId: new mongoose.Types.ObjectId(merchantId) }},
            { $group: { _id: null, totalSum: {
                $sum: "$amount"
            }}}
        ])

        return revenue[0]?.totalSum ?? 0;
    } catch (error) {
        console.error("Error while getting Revenue");
    }
}

export async function GET(req: NextRequest) {
    try {
        const merchantId = await verifyAuth(req) as mongoose.Types.ObjectId;

        if (!merchantId) {
            return sendRJResponse({ success: false, status: 401, message: "Unauthorized"});
        }

        const [orderCount, revenue] = await Promise.all([
            await getOrders(merchantId),
            await getRevenue(merchantId)
        ])

        return sendRJResponse({ success: true, message: "dashboard matrices feted successfully", data: {
            orders: orderCount,
            revenue: revenue
        }})


    } catch (error) {
        console.error("Error while getting dashboard matrices:", error);
        return sendRJResponse({ success: false, message: "Internal server error", status: 500 });
    }
}