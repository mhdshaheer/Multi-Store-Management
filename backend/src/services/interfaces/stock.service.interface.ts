import { CreateStockDto, UpdateStockDto } from "../../dtos/stock.dto";
import { IStock } from "../../models/stock.model";

export interface IStockService {
  addStock(stockData: CreateStockDto): Promise<IStock>;
  updateStock(
    stockId: string,
    updateData: UpdateStockDto,
  ): Promise<IStock | null>;
}
