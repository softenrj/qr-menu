import mongoose from "mongoose";

export interface userpayload {
    merchantId: mongoose.Types.ObjectId;
    uid: string;
}