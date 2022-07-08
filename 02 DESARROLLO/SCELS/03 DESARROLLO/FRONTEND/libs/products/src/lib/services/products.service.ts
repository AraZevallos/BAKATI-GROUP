import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) {

   }

   getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/api/v1/products/");
  }

  getFeaturedProducts(count: number):  Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${count}/`);
  }
}
