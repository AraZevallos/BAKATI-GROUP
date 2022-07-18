import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products/';

  constructor(private http: HttpClient) {

   }

   getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories', categoriesFilter.join(','));

      
    }
    return this.http.get<Product[]>(this.apiURLProducts, {params : params});
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

 getProductsCount(): Observable<number> {
  return this.http
    .get<number>(`${this.apiURLProducts}get/count`)
    .pipe(map((objectValue: any) => objectValue.count));
  }
}
