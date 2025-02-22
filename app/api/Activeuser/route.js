import { connectToDB } from "@/app/lib/DataBase";
import Visitors from "@/app/lib/model/Visitors";
import { NextResponse } from "next/server";  
let activeUsers = []; // Store active users temporarily (Resets on server restart)

export async function POST(req) {
    try {
        const { user } = await req.json();
        console.log("Received user:", user);

        // Store the user in memory
        if (!activeUsers.includes(user)) {
            activeUsers.push(user);
            const newVisitor = new Visitors({
                username: user,
                visitedAt: new Date() // Store visit time
            });

            await newVisitor.save();

            return NextResponse.json({ message: "Visitor saved successfully!" }, { status: 201 });
        }

        return Response.json({ message: "User tracked successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const param = new URL(req.url);
        const notifi = param.searchParams.get('notifi');

        await connectToDB(); 

        if (!notifi) {
            // ✅ Fetch all visitors
            const visitors = await Visitors.find().sort({ visitedAt: -1 });
            return NextResponse.json({ visitors }, { status: 200 }); 
        }

        console.log("Fetching active users...");
        return NextResponse.json({ activeUsers }, { status: 200 });

    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}