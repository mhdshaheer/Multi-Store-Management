import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.model';
import { HttpClient } from '@angular/common/http';
import { IGetStock, IStock, ITransferStock } from '../models/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private _http = inject(HttpClient);
  private _api = 'http://localhost:5000/api/v1/stock';

  addCreate(stock: IStock): Observable<ApiResponse<IStock>> {
    return this._http.post<ApiResponse<IStock>>(this._api, stock);
  }
  getStocks(): Observable<ApiResponse<IGetStock[]>> {
    return this._http.get<ApiResponse<IGetStock[]>>(this._api);
  }
  transferStock(transferData: ITransferStock): Observable<ApiResponse<IStock>> {
    return this._http.post<ApiResponse<IStock>>(`${this._api}/transfer`, transferData);
  }
}
