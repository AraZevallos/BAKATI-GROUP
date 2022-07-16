import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] =[]; 
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(private prodService: ProductsService, private categoriesService: CategoriesService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? this.isCategoryPage = true : this.isCategoryPage = false;
    });
   // this._getProducts();
    this._getCategories();
  } 

  _getProducts (categoriesFilter?: string[]){
    this.prodService.getProducts(categoriesFilter).subscribe(resProducts =>{
      this.products =resProducts;
    })
  }

  _getCategories(){
    this.categoriesService.getCategories().subscribe(resCategories =>{
      this.categories =resCategories;
  })
  }

  categoryFilter(){
    const selectedCategories = this.categories
    .filter(category => category.checked)
    .map(category => category.id);
   

    this._getProducts(selectedCategories);
  }
}
