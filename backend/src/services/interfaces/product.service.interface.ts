import { CreateProductDto, UpdateProductDto } from "../../dtos/product.dto";
import { IProduct } from "../../models/product.model";

export interface IProductService {
  createProduct(createProductDto: CreateProductDto): Promise<void>;
  updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct | null>;
}
