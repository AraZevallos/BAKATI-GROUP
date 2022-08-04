import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../../../orders/src/lib/services/cart.service';
import { CartItem } from '../../../../../orders/src/lib/models/cart';
import { environment } from '@env/environment';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  enSubs$: Subject<any> = new Subject();
  quantity= 1;
  base:string
  constructor(private productService: ProductsService, private route: ActivatedRoute,
              private cartService: CartService) { 
                this.base=environment.apiBase
              }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      if(params.productid){
        this._getProduct(params.productid);
      }
    })
  }

  ngOnDestroy(): void {
      this.enSubs$.next;
      this.enSubs$.complete;
  }


  private _getProduct(id: string){
    this.productService.getProduct(id).pipe(takeUntil(this.enSubs$)).subscribe(response =>{
      this.product = response
    })
  }

  addProductToCart(){
    const cartItem : CartItem ={
      productId: this.product.id,
      quantity: this.quantity
    }

    this.cartService.setCartItem(cartItem);
  }
}
