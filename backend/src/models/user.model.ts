import mongoose, { Model, Types } from "mongoose";
export interface IUser {
  _id?: Types.ObjectId;
  fullName?: string;
  username?: string;
  email: string;
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
  },
  { timestamps: true },
);

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  userSchema,
);
