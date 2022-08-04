import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {  

  featuredProducts: Product[] = [];
  endSubs$ : Subject<any> = new Subject();
  constructor(private prodService : ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  ngOnDestroy(): void {
      this.endSubs$.next;
      this.endSubs$.complete;
  }

  private _getFeaturedProducts(){
    this.prodService.getFeaturedProducts(4).subscribe(products=>{
      this.featuredProducts=products;
    })
  }
}
