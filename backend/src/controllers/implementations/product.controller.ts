import { Request, Response, NextFunction } from "express";
import { IProductController } from "../interfaces/product.controller.interface";
import { IProductService } from "../../services/interfaces/product.service.interface";

export class ProductController implements IProductController {
  constructor(private _productService: IProductService) {}
  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, sku } = req.body;
      await this._productService.createProduct({ name, sku });
      res.status(200).json({
        success: true,
        message: "Product is created",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, sku } = req.body;
      const productId = req.params.id;
      const updatedProduct = await this._productService.updateProduct(
        productId.toString(),
        { name, sku },
      );
      res.status(200).json({
        success: true,
        message: "Product updation is successs",
        updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const { products, total } = await this._productService.getProducts(
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        products,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
}
