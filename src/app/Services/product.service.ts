import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL: string = 'https://ecommerce.routemisr.com/';
  constructor(private _HttpClient: HttpClient) { }
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.BASE_URL}api/v1/categories`)
  }
  getAllProducts(pageNumber: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page", pageNumber);
    return this._HttpClient.get(`${this.BASE_URL}api/v1/products`, { params: queryParams })
  }
  getProductDetails(id: string) {
    return this._HttpClient.get(`${this.BASE_URL}api/v1/products/${id}`)
  }
}
