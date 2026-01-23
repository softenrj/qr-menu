import mongoose from "mongoose";

export interface IMQR {
  _id: mongoose.Types.ObjectId;
  merchantId: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const qrSchema = new mongoose.Schema<IMQR>(
  {
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

export const MQR =
  mongoose.models.MQR || mongoose.model<IMQR>("MQR", qrSchema);
