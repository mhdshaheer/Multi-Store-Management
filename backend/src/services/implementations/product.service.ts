import { CreateProductDto } from "../../dtos/product.dto";
import { IProductRepository } from "../../repositories/interfaces/product.repository.interface";
import { IProductService } from "../interfaces/product.service.interface";

export class ProductService implements IProductService {
  constructor(private _productRepository: IProductRepository) {}
  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const { name, sku } = createProductDto;
    const isProductExist = await this._productRepository.isExist(sku);
    if (isProductExist) {
      throw new Error("Product is already exist with this SKU ID");
    }
    const product = await this._productRepository.create({ name, sku });
    return;
  }
}
