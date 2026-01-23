import { userpayload } from "@/types/users";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const JWT_SECRET = process.env.JWT_SECRET!

export const tokenGenerator = (payload: userpayload): string | null => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "7d",
        });
        return token;
    } catch (error) {
        console.error(" JWT Token Gen: ", error);
        return null
    }
}

export const verifyToken = (token: string): mongoose.Types.ObjectId | null => {
    try {
        const payload = jwt.verify(token,JWT_SECRET) as userpayload;
        return payload.merchantId;
    } catch (error) {
        console.error("Error while Verify Tokens: ", error);
        return null;
    }
}