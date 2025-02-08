import mongoose from "mongoose";

const MONGODB = process.env.MONGODB_URL;

if (!MONGODB) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = globalThis.mongoose;

if (!cached) {
    cached = globalThis.mongoose={ conn: null, promise: null }
}

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB, {
        }).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}