import { Router } from "express";
import storeController from "../container/store.container";

const storeRouter = Router();
storeRouter.post("/", storeController.createStore.bind(storeController));
storeRouter.get("/", storeController.getStores.bind(storeController));
storeRouter.get(
  "/:storeId",
  storeController.getStoreById.bind(storeController),
);

export default storeRouter;
