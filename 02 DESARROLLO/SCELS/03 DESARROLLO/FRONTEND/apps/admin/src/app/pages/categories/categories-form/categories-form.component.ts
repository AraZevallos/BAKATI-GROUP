import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';
import { Category } from '../../../../../../../libs/products/src/lib/models/category';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'frontend-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmited:  boolean = false;
  editmode= false;
  currentCategoryID: string;

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder, 
              private categoriesService: CategoriesService,
              private location: Location,
              private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.form =this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color:['#fff']
    });

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.form.invalid){
      return;
    }
    const category: Category ={
      id: this.currentCategoryID,
      name: this.categoryform.name.value,
      icon: this.categoryform.icon.value,
      color: this.categoryform.color.value
    }
    if(this.editmode){
      this._updateCategory(category)
    }else{
      this._addCategory(category)
    }
  }

  private _addCategory(category: Category){
    this.categoriesService.createCategory(category).subscribe(response =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Categoría creada'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Categoría no creada'});
      console.log(error)
    });
  }

  private _updateCategory(category: Category){
    let categoriaTemp = {
      name: category.name,
      color: category.color,
      icon: category.icon
    }

    this.categoriesService.updateCategory(categoriaTemp, category.id)
    .subscribe((response) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Categoría actualizada'});
      timer(2000).toPromise().then(done=>{
        this.location.back();
      })
    },
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Categoría no creada'});
      console.log(error)
    });
  }


  private _checkEditMode(){
    this.route.params.subscribe(params =>{
      if(params.id){
        this.editmode=true;
        this.currentCategoryID = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category =>{
          this.categoryform.name.setValue(category.name);
          this.categoryform.icon.setValue(category.icon);
          this.categoryform.color.setValue(category.color);
        })
      }
    })
  }


  get categoryform(){
    return this.form.controls;
  }

  back(){
    this.location.back();
  }
}
