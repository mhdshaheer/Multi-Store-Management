import { Types } from "mongoose";
import { IProduct } from "../models/product.model";
import { IStore } from "../models/store.model";

export interface CreateStockDto {
  productId: string;
  storeId: string;
  quantity: number;
  threshold: number;
}
export interface UpdateStockDto {
  quantity: number;
  threshold: number;
}
export interface IGetStock {
  _id?: Types.ObjectId | string;
  product: IProduct;
  store: IStore;
  quantity: number;
  threshold: number;
}
