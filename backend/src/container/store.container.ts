import { StoreController } from "../controllers/implementations/store.controller";
import { StoreRepository } from "../repositories/implementations/store.repository";
import { StoreService } from "../services/implementations/store.service";

const storeRepository = new StoreRepository();
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

export default storeController;
