import mongoose from "mongoose";

export interface IMenu {
  _id: mongoose.Types.ObjectId;
  merchantId: mongoose.Types.ObjectId;
  image: string;
  title: string;
  price: number;
  quantity: number;
  originalPrice?: number;
  section: string;
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenu>(
  {
    merchantId: {type: mongoose.Schema.Types.ObjectId,ref: "merchants",required: true,index: true },
    image: {type: String,required: true,trim: true },
    title: {type: String,required: true,trim: true,maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    originalPrice: {type: Number,min: 0 },
    section: { type: String, required: true, trim: true, index: true },
  }, { timestamps: true, versionKey: false }
);

export const Menu = mongoose.models.Menu || mongoose.model<IMenu>("menus", menuSchema);
