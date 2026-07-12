import { Router } from "express";
import stockController from "../container/stock.container";

const stockRouter = Router();
stockRouter.post("/", stockController.addStock.bind(stockController));

export default stockRouter;
