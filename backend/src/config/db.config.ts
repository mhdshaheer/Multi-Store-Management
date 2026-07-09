import mongoose from "mongoose";
import { env } from "./env.config";
const mongoDb_URL = env.MONGO_URI as string;
export const mongoDb_connect = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoDb_URL);
    console.log("Database is connect successfully...");
  } catch (error) {
    console.error("Database connection is failed", error);
    process.exit(1);
  }
};
