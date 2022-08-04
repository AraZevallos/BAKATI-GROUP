import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Product, ProductsService } from '@frontend/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  base: string;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.base=environment.apiBase;
  }

  ngOnInit(): void {
    this._getProducts();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: '¿Quiere eliminar este Producto?',
      header: 'Eliminar Producto',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          (response) => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto eliminado',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Producto no eliminado',
            });
          }
        );
      },
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
