import { NextFunction, Request, Response } from "express";

export interface IStoreController {
  createStore(req: Request, res: Response, next: NextFunction): Promise<void>;
}
