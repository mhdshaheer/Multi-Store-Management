import jwt from "jsonwebtoken";
import { env } from "../config/env.config";

export const generateToken = (user_id: string, role: string) => {
  const token = jwt.sign(
    {
      id: user_id,
      role: role,
    },
    env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );
  return token;
};
