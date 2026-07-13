import { ClientSession } from "mongoose";
import { IStock, StockModel } from "../../models/stock.model";
import { BaseRepository } from "../base.repository";
import { IStockRepository } from "../interfaces/stock.repository.interface";
import { IGetStock } from "../../dtos/stock.dto";

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

  async decreaseStock(
    productId: string,
    storeId: string,
    quantity: number,
    session: ClientSession,
  ): Promise<IStock | null> {
    const stock = await this.model.findOne({ productId, storeId });
    if (!stock || stock.quantity < quantity) {
      throw new Error("Insufficient stock or stock record not found.");
    }
    stock.quantity -= quantity;
    await stock.save();
    return stock;
  }

  async increaseStock(
    productId: string,
    storeId: string,
    quantity: number,
    session: ClientSession,
  ): Promise<IStock | null> {
    let stock = await this.model.findOne({ productId, storeId });

    if (stock) {
      stock.quantity += quantity;
      await stock.save();
      return stock;
    } else {
      const newStock = new this.model({
        productId,
        storeId,
        quantity: quantity >= 0 ? quantity : 0,
      });
      await newStock.save();
      return newStock;
    }
  }
  async getStocks(): Promise<IGetStock[] | null> {
    const stocks = await this.model
      .find()
      .populate("productId")
      .populate("storeId")
      .lean()
      .exec();

    const populatedStocks: IGetStock[] = stocks.map((stock: any) => ({
      _id: stock._id,
      product: stock.productId,
      store: stock.storeId,
      quantity: stock.quantity,
      threshold: stock.threshold,
    }));

    return populatedStocks;
  }
}
