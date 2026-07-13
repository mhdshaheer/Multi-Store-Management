export interface IStock {
  _id?: string;
  productId: number;
  storeId: number;
  productName?: string;
  storeName?: string;
  quantity: number;
  threshold: number;
}
