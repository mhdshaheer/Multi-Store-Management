import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin, IRegister, IVerifyOtp } from '../models/auth.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _api = 'http://localhost:5000/api/v1/auth';

  login(loginData: ILogin): Observable<ApiResponse<ILogin>> {
    return this._http.post<ApiResponse<ILogin>>(`${this._api}/login`, loginData, {
      withCredentials: true,
    });
  }
  logout() {
    return this._http.post(`${this._api}/logout`, {});
  }
  register(registerData: IRegister) {
    return this._http.post<ApiResponse<IRegister>>(`${this._api}/register`, registerData, {
      withCredentials: true,
    });
  }
  verifyOtp(verifyData: IVerifyOtp) {
    return this._http.post<ApiResponse<IRegister>>(`${this._api}/verify`, verifyData);
  }
  resendOtp(email: string) {
    return this._http.post<ApiResponse<null>>(`${this._api}/verify`, email);
  }
}
