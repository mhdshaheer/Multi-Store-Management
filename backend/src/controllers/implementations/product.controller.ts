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
}
