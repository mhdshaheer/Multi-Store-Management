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
      const { productId, storeId, quantity, threshold } = req.body;
      const stock = await this._stockService.addStock({
        productId,
        storeId,
        quantity,
        threshold,
      });
      res.status(200).json({
        success: true,
        message: "Stock is created successfully",
        data: stock,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { stockId } = req.params;
      const { quantity, threshold } = req.body;
      const updateStock = await this._stockService.updateStock(
        stockId.toString(),
        { quantity, threshold },
      );
      res.status(200).json({
        success: true,
        message: "Stock updated Successfully",
        data: updateStock,
      });
    } catch (error) {
      next(error);
    }
  }
  async transferStock(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { productId, fromStoreId, toStoreId, quantity } = req.body;

      const result = await this._stockService.transferStock(
        productId,
        fromStoreId,
        toStoreId,
        quantity,
      );

      res.status(200).json({
        success: true,
        message: "Stock Transfer success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
  async getStocks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stocks = await this._stockService.getStocks();
      res.status(200).json({
        success:true,
        message:"Stocks are success fully fetched",
        data:stocks
      })
    } catch (error) {
      next(error)
    }
  }
}
