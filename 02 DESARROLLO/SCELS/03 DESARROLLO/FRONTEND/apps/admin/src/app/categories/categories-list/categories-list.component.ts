import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from '../../../../../../libs/products/src/lib/models/category';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'frontend-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private messageService: MessageService,private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(cats =>{
      this.categories=cats;
    })
  }

  deleteCategory(categoryId: string){
    this.categoriesService.deleteCategory(categoryId).subscribe(response=>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Categoría eliminada'});
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Categoría no eliminada'});
    })
  }

}
