import { Router } from "express";
import stockController from "../container/stock.container";

const stockRouter = Router();
stockRouter.post("/", stockController.addStock.bind(stockController));
stockRouter.get("/", stockController.getStocks.bind(stockController));
stockRouter.post(
  "/transfer",
  stockController.transferStock.bind(stockController),
);
stockRouter.put("/:stockId", stockController.updateStock.bind(stockController));

export default stockRouter;
