import { IMerchants, IROLE, Merchants } from "@/model/merchants";
import { tokenGenerator } from "@/utils/jwt";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10

export const newUser = async (name: string, email: string, password: string, role: IROLE): Promise<{ merchant: IMerchants, token: string } | null> => {
    try {
        const hash = bcrypt.hashSync(password, SALT_ROUNDS);
        const uid = uuidv4();

        const merchant = await Merchants.create({ name, email, password: hash, uid: uid, role });

        const token = tokenGenerator({ merchantId: merchant._id, uid: uid }) || "";

        return { merchant: merchant, token: token }
    } catch (error) {
        console.error("error while Sign up a merchant: ", error);
        return null;
    }
}

export const signIn = async (email: string, password: string): Promise<{ merchant: IMerchants, token: string } | null> => {
    try {
        const merchant = await Merchants.findOne({ email: email });

        if (!merchant) {
            return null;
        }

        const isValid = await bcrypt.compare(password, merchant.password);
        if (!isValid) return null;

        const token = tokenGenerator({ merchantId: merchant._id, uid: merchant.uid }) || "";

        return { merchant: merchant, token: token }
    } catch (error) {
        console.error("error while Sign up a merchant: ", error);
        return null;
    }
}