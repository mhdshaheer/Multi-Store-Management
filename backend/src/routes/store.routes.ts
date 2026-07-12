import { Router } from "express";
import storeController from "../container/store.container";

const storeRouter = Router();
storeRouter.post("/", storeController.createStore.bind(storeController));

export default storeRouter;
