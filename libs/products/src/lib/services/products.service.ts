import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiURL;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}products`);
  }

  // getProduct(productId: string): Observable<Product> {
  //   return this.http.get<Product>(
  //     `${this.apiURLProducts}products/${productId}`
  //   );
  // }

  // createProduct(product: Product): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiURLProducts}products`, product);
  // }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(
  //     `${this.apiURLProducts}products/${product.id}`,
  //     product
  //   );
  // }

  // deleteProduct(productId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLProducts}products/${productId}`);
  // }
}
