import { IStore } from "../../models/store.model";
import { IBaseRepository } from "../base.repository.interface";

export interface IStoreRepository extends IBaseRepository<IStore> {
  getStores(
    page: number,
    limit: number,
  ): Promise<{ stores: IStore[] | null; total: number }>;
}
