import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/v1/auth", authRouter);

export default app;
