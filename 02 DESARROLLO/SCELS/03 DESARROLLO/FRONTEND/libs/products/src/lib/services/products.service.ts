import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products/';

  constructor(private http: HttpClient) {

   }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLProducts);
  }

  getProduct(categoryId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLProducts}/${categoryId}`);
   }

  getFeaturedProducts(count: number):  Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURLProducts}get/featured/${count}/`);
  }

  createProduct(product: Product): Observable<Product>{
 
    return this.http.post<Product>(this.apiURLProducts, product);
 }

 updateProduct(product: Product, id: String): Observable<Product>{
  return this.http.put<Product>(this.apiURLProducts+id, product);
}


 deleteProduct(productId: string): Observable<Object>{
  return this.http.delete<Object>(`${this.apiURLProducts}${productId}`);
 }
}
