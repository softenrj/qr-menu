import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const filename = file.name; // Use only the original file name
        const uploadDir = path.join(process.cwd(), "public/uploads", filename);

        // Convert to buffer and save the file (overwrites if it exists)
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(uploadDir, buffer);

        return NextResponse.json({ imageUrl: `/uploads/${filename}` }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
    }
}
