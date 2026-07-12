import mongoose, { Document, Model } from "mongoose";

export interface IStore extends Document {
  name: string;
  address: string;
}

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const StoreModel: Model<IStore> = mongoose.model<IStore>(
  "Store",
  storeSchema,
);
