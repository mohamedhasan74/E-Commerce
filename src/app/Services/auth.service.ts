import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL: string = 'https://ecommerce.routemisr.com/';
  userData: any = null;
  isLogged: BehaviorSubject<any>;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.isLogged = new BehaviorSubject(null);
  }

  registerOperation(userInfo: any): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}api/v1/auth/signup`, userInfo);
  }
  loginOperation(userInfo: any): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}api/v1/auth/signin`, userInfo)
  }

  decodeToken() {
    let token: any = localStorage.getItem("userToken")
    this.userData = jwtDecode(token);
    this.isLogged.next(this.userData);
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.isLogged.next(null);
    this._Router.navigate(['/login'])
  }
  forgetPassword(email: any): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}api/v1/auth/forgotPasswords`, email)
  }
  resetPassword(resetPassword: any): Observable<any> {
    return this._HttpClient.post(`${this.BASE_URL}api/v1/auth/verifyResetCode`, resetPassword)
  }
  verifyPassword(userData: any): Observable<any> {
    return this._HttpClient.put(`${this.BASE_URL}api/v1/auth/resetPassword`, userData)
  }
}
