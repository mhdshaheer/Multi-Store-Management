import dotenv from "dotenv";
import app from "./app";
import { env } from "./config/env.config";
import { mongoDb_connect } from "./config/db.config";
import { connectRedis } from "./config/redis.config";

const PORT = env.PORT;
(async () => {
  await connectRedis();
  await mongoDb_connect();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();
