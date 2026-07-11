export interface CreateProductDto {
  name: string;
  sku: string;
}
export interface UpdateProductDto{
    name?:string,
    sku?:string
}
