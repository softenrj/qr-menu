let activeUsers = []; // Store active users temporarily (Resets on server restart)

export async function POST(req) {
    try {
        const { user } = await req.json(); 
        console.log("Received user:", user);

        // Store the user in memory
        if (!activeUsers.includes(user)) {
            activeUsers.push(user);
        }

        return Response.json({ message: "User tracked successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log("Fetching active users...");
        return Response.json({ activeUsers }, { status: 200 });
    } catch (error) {
        console.error("Error handling request:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
