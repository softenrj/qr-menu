import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { message } = await req.json(); // Parse request body

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_URL}`;

        const response = await axios.post(API_URL, {
            contents: [
                {
                    parts: [
                        {
                            text: `Act as a restaurant AI assistant. Respond to this query: ${message}.
                                   Keep responses under 3 sentences. Be friendly and food-focused.`
                        }
                    ]
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return NextResponse.json({ response: response.data.candidates[0].content.parts[0].text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
