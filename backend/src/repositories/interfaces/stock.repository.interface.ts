import { IStock } from "../../models/stock.model";
import { IBaseRepository } from "../base.repository.interface";

export interface IStockRepository extends IBaseRepository<IStock> {
  findByCondition(data: Partial<IStock>): Promise<IStock | null>;
}
