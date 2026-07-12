import { CreateStockDto } from "../../dtos/stock.dto";
import { IStock } from "../../models/stock.model";
import { IStockRepository } from "../../repositories/interfaces/stock.repository.interface";
import { IStockService } from "../interfaces/stock.service.interface";

export class StockService implements IStockService {
  constructor(private _stockRepository: IStockRepository) {}
  async addStock(stockData: CreateStockDto): Promise<IStock> {
    const { productId, storeId, quantity } = stockData;
    if (!productId?.length) {
      throw new Error("Product id is missing");
    }
    if (!storeId?.length) {
      throw new Error("Store Id is missing");
    }
    const stock = await this._stockRepository.create(stockData);
    return stock;
  }
}
