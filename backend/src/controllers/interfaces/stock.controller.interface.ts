import { NextFunction, Request, Response } from "express";

export interface IStockController {
  addStock(req: Request, res: Response, next: NextFunction): Promise<void>;
}
