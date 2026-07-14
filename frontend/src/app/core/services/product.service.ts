import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);
  private _api = 'http://localhost:5000/api/v1/product';

  getProducts(): Observable<ApiResponse<IProduct[]>> {
    return this._http.get<ApiResponse<IProduct[]>>(this._api, {
      withCredentials: true,
    });
  }
  addProduct(product: IProduct): Observable<ApiResponse<IProduct>> {
    return this._http.post<ApiResponse<IProduct>>(this._api, product, {
      withCredentials: true,
    });
  }
  updateProduct(productId: string, product: IProduct): Observable<ApiResponse<IProduct>> {
    return this._http.put<ApiResponse<IProduct>>(`${this._api}/${productId}`, product, {
      withCredentials: true,
    });
  }
}
