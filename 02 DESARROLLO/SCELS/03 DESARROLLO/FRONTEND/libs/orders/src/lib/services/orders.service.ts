import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '@env/environment';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders/';
  apiURLProducts = environment.apiURL + 'products/';
  constructor(private http: HttpClient, private stripeService: StripeService) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiURLOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(this.apiURLOrders + orderId, orderStatus);
  }

  deleteOrder(orderId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLOrders}${orderId}`);
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

  getProduct(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}/${categoryId}`);
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http
      .post<any>(`${this.apiURLOrders}/create-checkout-session`, orderItem)
      .pipe(
        switchMap((session: { id: string }) => {
          return this.stripeService.redirectToCheckout({
            sessionId: session.id,
          });
        })
      );
  }
}
