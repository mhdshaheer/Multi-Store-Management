import { StockController } from "../controllers/implementations/stock.controller";
import { StockRepository } from "../repositories/implementations/stock.repository";
import { StockService } from "../services/implementations/stock.service";

const stockRepository = new StockRepository();
const stockService = new StockService(stockRepository);
const stockController = new StockController(stockService);

export default stockController;
