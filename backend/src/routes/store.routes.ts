import { Router } from "express";
import storeController from "../container/store.container";
import { authenticate } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const storeRouter = Router();
storeRouter.post(
  "/",
  authenticate,
  adminMiddleware,
  storeController.createStore.bind(storeController),
);
storeRouter.get(
  "/",
  authenticate,
  storeController.getStores.bind(storeController),
);
storeRouter.get(
  "/:storeId",
  authenticate,
  storeController.getStoreById.bind(storeController),
);

export default storeRouter;
