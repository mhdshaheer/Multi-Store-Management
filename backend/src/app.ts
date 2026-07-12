import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.routes";
import storeRouter from "./routes/store.routes";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/store", storeRouter);

export default app;
