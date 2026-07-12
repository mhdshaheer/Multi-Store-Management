import { NextFunction, Request, Response } from "express";

export interface IStoreController {
  createStore(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStoreById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getStores(req: Request, res: Response, next: NextFunction): Promise<void>;
}
