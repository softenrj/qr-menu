export type ICartItem = {
    item: string; 
    quantity: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}