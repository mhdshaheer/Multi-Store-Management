import dotenv from "dotenv";

dotenv.config();
export const env = {
  get PORT() {
    return process.env.PORT;
  },
  get MONGO_URI() {
    return process.env.MONGO_URI;
  },
  get REDIS_URL() {
    return process.env.REDIS_URL;
  },
  get MAIL_USER() {
    return process.env.MAIL_USER;
  },
  get MAIL_PASSWORD() {
    return process.env.MAIL_PASSWORD;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET;
  },
  get ACCESS_TOKEN_SECRET() {
    return process.env.ACCESS_TOKEN_SECRET;
  },
  get REFRESH_TOKEN_SECRET() {
    return process.env.REFRESH_TOKEN_SECRET;
  },
  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
};
