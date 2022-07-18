import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
   apiURLOrders = environment.apiURL + 'orders/';
   apiURLProducts = environment.apiURL + 'products/';
  constructor(private http: HttpClient) {

   }

   getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLOrders);
   }

   getOrder(orderId: string): Observable<Order>{
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
   }

   createOrder(order: Order): Observable<Order>{
      return this.http.post<Order>(this.apiURLOrders, order);
   }

   updateOrder(orderStatus: {status: string}, orderId: String): Observable<Order>{
    return this.http.put<Order>(this.apiURLOrders+orderId, orderStatus);
 }

   deleteOrder(orderId: string): Observable<Object>{
    return this.http.delete<Object>(`${this.apiURLOrders}${orderId}`);
   }

   
  getOrdersCount(): Observable<number> {
   return this.http
     .get<number>(`${this.apiURLOrders}get/count`)
     .pipe(map((objectValue: any) => objectValue.count));
 }

 getTotalSales(): Observable<number> {
   return this.http
     .get<number>(`${this.apiURLOrders}get/totalsales`)
     .pipe(map((objectValue: any) => objectValue.totalSales));
 }

  getProduct(categoryId: string): Observable<any>{
    return this.http.get<any>(`${this.apiURLProducts}/${categoryId}`);
  }
}
