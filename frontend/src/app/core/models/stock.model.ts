import { IProduct } from './product.model';
import { IStore } from './store.model';

export interface IStock {
  _id?: string;
  productId: string;
  storeId: string;
  productName?: string;
  storeName?: string;
  quantity: number;
  threshold: number;
}
export interface IGetStock {
  _id?: string;
  product: IProduct;
  store: IStore;
  quantity: number;
  threshold: number;
}
export interface ITransferStock {
  productId: string;
  fromStoreId: string;
  toStoreId: string;
  quantity: number;
}
