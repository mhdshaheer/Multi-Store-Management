import { IStore, StoreModel } from "../../models/store.model";
import { BaseRepository } from "../base.repository";
import { IStoreRepository } from "../interfaces/store.repository.interface";

export class StoreRepository extends BaseRepository<IStore> implements IStoreRepository{
    constructor(){
        super(StoreModel)
    }
}