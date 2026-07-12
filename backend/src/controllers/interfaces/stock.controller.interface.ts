import { NextFunction, Request, Response } from "express";

export interface IStockController {
  addStock(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateStock(req: Request, res: Response, next: NextFunction): Promise<void>;
  transferStock(req: Request, res: Response, next: NextFunction): Promise<void>;
}
