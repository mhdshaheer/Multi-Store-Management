import { CreateStockDto, UpdateStockDto } from "../../dtos/stock.dto";
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
    // check the same stock exist
    const existStock = await this._stockRepository.findByCondition({
      productId,
      storeId,
    });
    if (existStock) {
      throw new Error("This item stock is already exist on the same store");
    }
    const stock = await this._stockRepository.create(stockData);
    return stock;
  }

  async updateStock(
    stockId: string,
    updateData: UpdateStockDto,
  ): Promise<IStock | null> {
    const isStockExist = await this._stockRepository.isExist(stockId);
    if (!isStockExist) {
      throw new Error("StockId is not exist");
    }
    if (updateData.quantity) {
      if (updateData.quantity < 0) {
        throw new Error("Stock quantinty is not be negative");
      }
    }
    const updateStock = await this._stockRepository.update(stockId, updateData);
    return updateStock;
  }
}
