import mongoose, { Document, Model } from "mongoose";

export interface IStore extends Document {
  name: string;
  address: string;
}

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true },
);

export const StoreModel: Model<IStore> = mongoose.model<IStore>(
  "Store",
  storeSchema,
);
