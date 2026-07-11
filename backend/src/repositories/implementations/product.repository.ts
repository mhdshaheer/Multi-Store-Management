import { IProduct, ProductModel } from "../../models/product.model";
import { BaseRepository } from "../base.repository";
import { IProductRepository } from "../interfaces/product.repository.interface";

export class ProductRepository
  extends BaseRepository<IProduct>
  implements IProductRepository
{
  constructor() {
    super(ProductModel);
  }
  async isExist(sku: string): Promise<boolean> {
    const product = await this.model.exists({ sku });
    return !!product;
  }
  async findByName(name: string): Promise<IProduct | null> {
    return await this.model.findOne({ name });
  }
  async findBySKU(sku: string): Promise<IProduct | null> {
    return await this.model.findOne({ sku });
  }
}
