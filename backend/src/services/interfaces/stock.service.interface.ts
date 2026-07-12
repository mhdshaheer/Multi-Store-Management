import { CreateStockDto } from "../../dtos/stock.dto";
import { IStock } from "../../models/stock.model";

export interface IStockService {
  addStock(stockData: CreateStockDto): Promise<IStock>;
}
