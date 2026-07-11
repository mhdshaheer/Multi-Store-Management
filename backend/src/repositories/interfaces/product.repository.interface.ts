import { IProduct } from "../../models/product.model";
import { IBaseRepository } from "../base.repository.interface";

export interface IProductRepository extends IBaseRepository<IProduct> {
  isExist(sku: string): Promise<boolean>;
}
