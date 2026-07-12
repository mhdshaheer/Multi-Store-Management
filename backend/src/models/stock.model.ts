import mongoose, { Document, Model, Types } from "mongoose";

export interface IStock extends Document {
  productId: Types.ObjectId;
  storeId: Types.ObjectId;
  quantity: number;
}

const stockModal = new mongoose.Schema<IStock>(
  {
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    storeId: {
      type: Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

export const StockModel: Model<IStock> = mongoose.model<IStock>(
  "Stock",
  stockModal,
);
