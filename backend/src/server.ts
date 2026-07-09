import dotenv from "dotenv";
import app from "./app";
import { env } from "./config/env.config";

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
