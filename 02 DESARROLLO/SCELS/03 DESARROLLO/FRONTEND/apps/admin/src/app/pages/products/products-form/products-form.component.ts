import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';

@Component({
  selector: 'frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  editmode = false;
  form: FormGroup
  isSubmited  = false;
  catagories = [];
  imageDisplay: string | ArrayBuffer;

  constructor(private FormBuilder: FormBuilder, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm(){
   this.form = this.FormBuilder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    countInStock: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: [''],
    isFeatured: ['']
   });
  }

 private _getCategories(){
  this.categoriesService.getCategories().subscribe(categories =>{
    this.catagories = categories;
  })
 }

  get productForm(){
    return this.form.controls;
  }

  onSubmit(){

  }

  back(){

  }

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageDisplay = fileReader.result
      };
      fileReader.readAsDataURL(file);
    }
  }
}
