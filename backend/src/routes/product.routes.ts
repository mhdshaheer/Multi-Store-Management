import { Router } from "express";
import productController from "../container/product.container";

const productRouter = Router();
productRouter.post(
  "/",
  productController.createProduct.bind(productController),
);
productRouter.get("/", productController.getProducts.bind(productController));
productRouter.put(
  "/:id",
  productController.updateProduct.bind(productController),
);

export default productRouter;
