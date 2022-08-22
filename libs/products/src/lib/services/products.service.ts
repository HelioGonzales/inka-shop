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

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiURLProducts}products/${productId}`
    );
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiURLProducts}products`,
      productData
    );
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiURLProducts}products/${productId}`,
      productData
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}products/${productId}`);
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.apiURLProducts}products/get/featured/${count}`
    );
  }
}
