import mongoose, { Document, Model, Types } from "mongoose";
export interface IProduct extends Document {
  name: string;
  sku: string;
}
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    sku: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

export const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Peoduct",
  productSchema,
);
