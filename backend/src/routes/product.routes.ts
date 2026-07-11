import { Router } from "express";
import productController from "../container/product.container";

const productRouter = Router();
productRouter.post(
  "/create",
  productController.createProduct.bind(productController),
);

export default productRouter;
