import { IStore, StoreModel } from "../../models/store.model";
import { BaseRepository } from "../base.repository";
import { IStoreRepository } from "../interfaces/store.repository.interface";

export class StoreRepository
  extends BaseRepository<IStore>
  implements IStoreRepository
{
  constructor() {
    super(StoreModel);
  }
  async getStores(
    page: number,
    limit: number,
  ): Promise<{ stores: IStore[] | null; total: number }> {
    const skip = (page-1)*limit;
    const [stores,total]= await Promise.all([
        this.model.find().skip(skip).limit(limit).sort({createAt:-1}),
        this.model.countDocuments()
    ])
    return {
        stores,total
    }
  }
}
