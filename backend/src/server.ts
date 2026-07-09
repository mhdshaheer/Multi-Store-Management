import dotenv from "dotenv";
import app from "./app";
import { env } from "./config/env.config";
import { mongoDb_connect } from "./config/db.config";

const PORT = env.PORT;
(async () => {
  await mongoDb_connect();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
})();
