import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLCategories = environment.apiURL + 'products/';

  constructor(private http: HttpClient) {

   }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURLCategories);
  }

  getFeaturedProducts(count: number):  Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURLCategories}get/featured/${count}/`);
  }
}
