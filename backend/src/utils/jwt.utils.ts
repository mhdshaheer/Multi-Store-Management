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

export const generateAccessToken = (user_id: string, role: string) => {
  const token = jwt.sign(
    {
      id: user_id,
      role,
    },
    env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "1d",
    },
  );
  return token;
};

export const generateRefreshToken = (user_id: string) => {
  const token = jwt.sign(
    {
      id: user_id,
    },
    env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "3d",
    },
  );

  return token;
};
