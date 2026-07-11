import { createClient } from "redis";
import { env } from "./env.config";

const redis_url = env.REDIS_URL;

const redis_cient = createClient({
  url: redis_url,
});

redis_cient.on("error", (err) => {
  console.log(err);
});

redis_cient.on("connect", () => {
  console.log("redis Client is running");
});
redis_cient.on("ready", () => console.log(" Redis Client Ready to use!"));
redis_cient.on("error", (err) => console.error("Redis Client Error:", err));
redis_cient.on("end", () => console.log("Redis Client Disconnected"));

export const connectRedis = async (): Promise<void> => {
  try {
    await redis_cient.connect();
  } catch (error) {
    console.error("Failed to connect Redis:", error);
    process.exit(1);
  }
};
