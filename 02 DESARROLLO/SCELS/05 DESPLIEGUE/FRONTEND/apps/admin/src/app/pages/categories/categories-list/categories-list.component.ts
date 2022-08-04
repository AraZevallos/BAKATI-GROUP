import { Component, OnInit } from '@angular/core';


import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from '../../../../../../../libs/products/src/lib/models/category';

@Component({
  selector: 'frontend-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              private categoriesService: CategoriesService,
              private router: Router) {}

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: '¿Quiere eliminar esta categoría?',
      header: 'Eliminar Categoría',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(response=>{
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Success', detail:'Categoría eliminada'});
        },
        (error)=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Categoría no eliminada'});
        })
      },
  });
  
  }

  updateCategory(categoryId: string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }


  private _getCategories(){
    this.categoriesService.getCategories().subscribe(cats =>{
      this.categories=cats;
    })
  }
}
