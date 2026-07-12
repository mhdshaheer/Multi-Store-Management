import { Response, NextFunction, Request } from "express";
import { IStockService } from "../../services/interfaces/stock.service.interface";
import { IStockController } from "../interfaces/stock.controller.interface";

export class StockController implements IStockController {
  constructor(private _stockService: IStockService) {}
  async addStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { productId, storeId, quantity } = req.body;
      const stock = await this._stockService.addStock({
        productId,
        storeId,
        quantity,
      });
      res.status(200).json({
        success: true,
        message: "Stock is created successfully",
        stock,
      });
    } catch (error) {
      next(error);
    }
  }
}
