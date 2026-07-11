import { CreateProductDto, UpdateProductDto } from "../../dtos/product.dto";
import { IProduct } from "../../models/product.model";
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
  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<IProduct | null> {
    const product = await this._productRepository.findById(productId);
    if (!product) {
      throw new Error("Product is not exist");
    }
    if (updateProductDto.name && updateProductDto.name !== product.name) {
      const nameExist = await this._productRepository.findByName(
        updateProductDto.name,
      );
      if (nameExist) {
        throw new Error("Product name already exist");
      }
    }

    if (updateProductDto.sku && updateProductDto.sku != product.sku) {
      const skuExist = await this._productRepository.findBySKU(
        updateProductDto.sku,
      );
      if (skuExist) {
        throw new Error("SKU is already exist");
      }
    }

    const updatedProduct = await this._productRepository.update(
      productId,
      updateProductDto,
    );
    if (!updateProductDto) {
      throw new Error("Product updation failed");
    }
    return updatedProduct;
  }

  async getProducts(
    page: number,
    limit: number,
  ): Promise<{ products: IProduct[] | null; total: number }> {
    const { products, total } = await this._productRepository.findAll(
      page,
      limit,
    );
    return { products, total };
  }
}
