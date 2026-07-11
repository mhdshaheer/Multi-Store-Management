import { IProduct } from "../../models/product.model";
import { IBaseRepository } from "../base.repository.interface";

export interface IProductRepository extends IBaseRepository<IProduct> {
  isExist(sku: string): Promise<boolean>;
  findByName(name: string): Promise<IProduct | null>;
  findBySKU(sku: string): Promise<IProduct | null>;
}
