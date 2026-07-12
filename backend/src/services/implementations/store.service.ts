import { CreateStoreDto } from "../../dtos/store.dto";
import { IStore } from "../../models/store.model";
import { IStoreRepository } from "../../repositories/interfaces/store.repository.interface";
import { IStoreService } from "../interfaces/store.service.interface";

export class StoreService implements IStoreService {
  constructor(private _storeRepository: IStoreRepository) {}
  async createStore(storeData: CreateStoreDto): Promise<IStore | null> {
    const { name, address } = storeData;
    if (!name?.length) {
      throw new Error("Name field not found");
    }
    if (!address?.length) {
      throw new Error("Address field not found");
    }
    const store = await this._storeRepository.create(storeData);
    return store;
  }
  async getStoreById(storeId: string): Promise<IStore | null> {
    const store = await this._storeRepository.findById(storeId);
    return store;
  }
  async getStores(
    page: number,
    limit: number,
  ): Promise<{ stores: IStore[] | null; total: number }> {
    const { stores, total } = await this._storeRepository.getStores(
      page,
      limit,
    );
    return {
      stores,
      total,
    };
  }
}
