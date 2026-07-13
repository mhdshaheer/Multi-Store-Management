import {
  CreateStockDto,
  IGetStock,
  UpdateStockDto,
} from "../../dtos/stock.dto";
import { IStock } from "../../models/stock.model";

export interface IStockService {
  addStock(stockData: CreateStockDto): Promise<IStock>;
  updateStock(
    stockId: string,
    updateData: UpdateStockDto,
  ): Promise<IStock | null>;
  transferStock(
    productId: string,
    fromStockId: string,
    toStockId: string,
    quantity: number,
  ): Promise<{ success: boolean; message: string }>;
  getStocks(): Promise<IGetStock[] | null>;
}
