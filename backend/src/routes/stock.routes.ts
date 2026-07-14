import { Router } from "express";
import stockController from "../container/stock.container";
import { authenticate } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const stockRouter = Router();
stockRouter.post(
  "/",
  authenticate,
  adminMiddleware,
  stockController.addStock.bind(stockController),
);
stockRouter.get(
  "/",
  authenticate,
  stockController.getStocks.bind(stockController),
);
stockRouter.post(
  "/transfer",
  authenticate,
  adminMiddleware,
  stockController.transferStock.bind(stockController),
);
stockRouter.put(
  "/:stockId",
  authenticate,
  adminMiddleware,
  stockController.updateStock.bind(stockController),
);

export default stockRouter;
