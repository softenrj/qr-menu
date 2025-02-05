import multer from "multer";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

// Define the upload directory
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, uploadDir);
    },
    filename: (req, file, next) => {
        next(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize multer instance
const upload = multer({ storage });

// Multer middleware wrapper
const uploadMiddleware = (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single("image")(req, res, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

// API Route for Upload (App Router)
export async function POST(req) {
    try {
        // Convert request to a readable stream for multer
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}${path.extname(file.name)}`;
        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ imageUrl: `/uploads/${filename}` }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }
}
