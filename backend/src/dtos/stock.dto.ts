export interface CreateStockDto {
  productId: string;
  storeId: string;
  quantity: number;
}
export interface UpdateStockDto {
  quantity: number;
}
