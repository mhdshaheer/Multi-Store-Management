import { Router } from "express";
import productController from "../container/product.container";
import { authenticate } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const productRouter = Router();
productRouter.post(
  "/",
  authenticate,
  adminMiddleware,
  productController.createProduct.bind(productController),
);
productRouter.get(
  "/",
  authenticate,
  adminMiddleware,
  productController.getProducts.bind(productController),
);
productRouter.put(
  "/:id",
  authenticate,
  adminMiddleware,
  productController.updateProduct.bind(productController),
);

export default productRouter;
