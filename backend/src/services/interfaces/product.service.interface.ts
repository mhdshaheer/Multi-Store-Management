import { CreateProductDto } from "../../dtos/product.dto";

export interface IProductService {
  createProduct(createProductDto: CreateProductDto): Promise<void>;
}
