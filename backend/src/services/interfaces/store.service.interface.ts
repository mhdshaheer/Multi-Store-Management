import { CreateStoreDto } from "../../dtos/store.dto";
import { IStore } from "../../models/store.model";

export interface IStoreService {
  createStore(storeData: CreateStoreDto): Promise<IStore | null>;
  getStoreById(storeId: string): Promise<IStore | null>;
}
