import { Request, Response, NextFunction } from "express";
import { IStoreController } from "../interfaces/store.controller.interface";
import { IStoreService } from "../../services/interfaces/store.service.interface";

export class StoreController implements IStoreController {
  constructor(private _storeService: IStoreService) {}
  async createStore(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, address } = req.body;
      const store = await this._storeService.createStore({ name, address });
      res.status(200).json({
        success: true,
        message: "Store is created",
        store,
      });
    } catch (error) {
      next(error);
    }
  }
}
