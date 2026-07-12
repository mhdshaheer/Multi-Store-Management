import { IStock, StockModel } from "../../models/stock.model";
import { BaseRepository } from "../base.repository";
import { IStockRepository } from "../interfaces/stock.repository.interface";

export class StockRepository
  extends BaseRepository<IStock>
  implements IStockRepository
{
  constructor() {
    super(StockModel);
  }
  async findByCondition(data: Partial<IStock>): Promise<IStock | null> {
    return await this.model.findOne(data);
  }
  async isExist(stockId: string): Promise<boolean> {
    const isStockIdExist = await this.model.exists({ _id: stockId });
    return !!isStockIdExist;
  }
}
