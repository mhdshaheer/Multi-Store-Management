import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.model';
import { IStore } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private _http = inject(HttpClient);
  private _api = 'http://localhost:5000/api/v1/store';

  getStores(): Observable<ApiResponse<IStore[]>> {
    return this._http.get<ApiResponse<IStore[]>>(this._api);
  }
  createStore(store: IStore): Observable<ApiResponse<IStore>> {
    return this._http.post<ApiResponse<IStore>>(this._api, store);
  }
}
