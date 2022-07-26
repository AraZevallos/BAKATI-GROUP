import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
  styles: [],
})
export class ThankYouComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const orderData = this.orderService.getCachedOrderData();
    this.orderService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.orderService.removeCachedOrderData();
    });
  }
}
