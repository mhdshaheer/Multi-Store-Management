import mongoose, { Document, Model, Types } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "USER",
    },
  },
  { timestamps: true },
);

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema,
);
