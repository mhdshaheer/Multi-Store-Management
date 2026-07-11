import { ProductController } from "../controllers/implementations/product.controller";
import { ProductRepository } from "../repositories/implementations/product.repository";
import { ProductService } from "../services/implementations/product.service";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
export default productController;
