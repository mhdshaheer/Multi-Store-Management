import { createClient } from "redis";
import { env } from "./env.config";

const redis_url = env.REDIS_URL;

export const redis_client = createClient({
  url: redis_url,
});

redis_client.on("error", (err) => {
  console.log(err);
});

redis_client.on("connect", () => {
  console.log("redis Client is running");
});
redis_client.on("ready", () => console.log(" Redis Client Ready to use!"));
redis_client.on("error", (err) => console.error("Redis Client Error:", err));
redis_client.on("end", () => console.log("Redis Client Disconnected"));

export const connectRedis = async (): Promise<void> => {
  try {
    await redis_client.connect();
  } catch (error) {
    console.error("Failed to connect Redis:", error);
    process.exit(1);
  }
};
