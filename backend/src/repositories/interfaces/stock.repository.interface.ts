import { ClientSession } from "mongoose";
import { IStock } from "../../models/stock.model";
import { IBaseRepository } from "../base.repository.interface";
import { IGetStock } from "../../dtos/stock.dto";

export interface IStockRepository extends IBaseRepository<IStock> {
  findByCondition(data: Partial<IStock>): Promise<IStock | null>;
  isExist(stockId: string): Promise<boolean>;
  decreaseStock(
    productId: string,
    storeId: string,
    quantity: number,
    session: ClientSession,
  ): Promise<IStock | null>;

  increaseStock(
    productId: string,
    storeId: string,
    quantity: number,
    session: ClientSession,
  ): Promise<IStock | null>;
  getStocks(): Promise<IGetStock[] | null>;
}
