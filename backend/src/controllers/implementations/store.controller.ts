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
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }
  async getStoreById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const storeId = req.params.storeId;
      const store = await this._storeService.getStoreById(storeId.toString());
      res.status(200).json({
        success: true,
        message: "Store data is fetched successfully",
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }
  async getStores(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const { stores, total } = await this._storeService.getStores(page, limit);
      res.status(200).json({
        success: true,
        message: "Store data is fetched successfully",
        data: stores,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
}
