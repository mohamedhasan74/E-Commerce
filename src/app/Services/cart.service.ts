import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BASE_URL: string = 'https://ecommerce.routemisr.com/';
  numOfProducts: BehaviorSubject<number>;
  constructor(private _HttpClient: HttpClient) {
    this.numOfProducts = new BehaviorSubject(0);
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.numOfProducts.next(response.numOfCartItems);
      }
    })
  }

  addToCart(productId: string): Observable<any> {
    let header: any = { token: localStorage.getItem('userToken') }
    return this._HttpClient.post(`${this.BASE_URL}api/v1/cart`, { productId }, { headers: header })
  }
  getLoggedUserCart(): Observable<any> {
    let header: any = { token: localStorage.getItem('userToken') }
    return this._HttpClient.get(`${this.BASE_URL}api/v1/cart`, { headers: header })
  }
  removeSpecificItem(productId: string): Observable<any> {
    let header: any = { token: localStorage.getItem('userToken') }

    return this._HttpClient.delete(`${this.BASE_URL}api/v1/cart/${productId}`, { headers: header })
  }
  updateItemQuantity(id: string, count: number) {
    let header: any = { token: localStorage.getItem('userToken') }

    return this._HttpClient.put(`${this.BASE_URL}api/v1/cart/${id}`, { count }, { headers: header })
  }
  clearUserCart(): Observable<any> {
    let header: any = { token: localStorage.getItem('userToken') }
    return this._HttpClient.delete(`${this.BASE_URL}api/v1/cart`, { headers: header })
  }
}
