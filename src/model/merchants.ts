import mongoose from "mongoose"

export enum IROLE {
    MERCHANT = "MERCHANT",
    CONSUMER = "CONSUMER"
}

export interface IMerchants {
    _id: mongoose.Types.ObjectId;
    name: string;
    role: IROLE;
    uid: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const merchantsSchema = new mongoose.Schema<IMerchants>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: IROLE, default: IROLE.CONSUMER },
    password: { type: String, required: true },
}, { timestamps: true });

export const Merchants =mongoose.models.merchants ||  mongoose.model<IMerchants>('merchants',merchantsSchema);