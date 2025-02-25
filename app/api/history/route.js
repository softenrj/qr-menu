import { NextResponse } from "next/server";
import OrderHistory from "@/app/lib/model/orderHistory";
import { connectToDB } from "@/app/lib/DataBase";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const params = searchParams.get('mode');
        connectToDB();
        if(!params){
            const data = await OrderHistory.find({});
            return NextResponse.json({data},{status: 200});
        }
        return NextResponse.json({ data: "hello ji" }, { status: 200 });
    } catch {

    }
}