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
