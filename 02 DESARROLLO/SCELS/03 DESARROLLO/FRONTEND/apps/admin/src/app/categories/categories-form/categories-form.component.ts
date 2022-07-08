import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from '../../../../../../libs/products/src/lib/models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'frontend-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmited:  boolean = false;
  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private categoriesService: CategoriesService, private location: Location ) { }

  ngOnInit(): void {
    this.form =this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.form.invalid){
      return;
    }
    const category: Category={
      name: this.categoryform.name.value,
      icon: this.categoryform.icon.value
    }
    this.categoriesService.createCategory(category).subscribe(response =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Categoría creada'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Categoría no creada'});
    });
  }

  get categoryform(){
    return this.form.controls;
  }
}
