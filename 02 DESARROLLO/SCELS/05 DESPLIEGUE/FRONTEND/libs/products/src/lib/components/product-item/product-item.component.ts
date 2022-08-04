import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../../../../orders/src/lib/services/cart.service';
import { CartItem } from '../../../../../orders/src/lib/models/cart';
import { environment } from '@env/environment';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product
  base:string
  constructor(private cartService: CartService) {
    this.base=environment.apiBase
   }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem: CartItem ={
      productId: this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem)  
  }
}
