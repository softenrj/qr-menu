import { IROLE } from "./role";

export interface IMerchants {
    _id: string;
    name: string;
    role: IROLE;
    uid: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}