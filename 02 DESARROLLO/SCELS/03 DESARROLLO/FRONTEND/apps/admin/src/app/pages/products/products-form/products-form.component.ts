import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';
import { Product } from '../../../../../../../libs/products/src/lib/models/product';
import { ProductsService } from '../../../../../../../libs/products/src/lib/services/products.service';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  currentProductID: string;

  constructor(private formBuilder: FormBuilder, 
              private productsService: ProductsService, 
              private categoriesService: CategoriesService,
              private messageService: MessageService,
              private location: Location,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
   this.form = this.formBuilder.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    countInStock: ['', Validators.required],
    description: ['', Validators.required],
    richDescription: [''],
    image: [''],
    isFeatured: [false]
   });
  }

 private _getCategories(){
  this.categoriesService.getCategories().subscribe(categories =>{
    this.catagories = categories;
  })
 }


  onSubmit(){
    this.isSubmited = true;
    if(this.form.invalid) {return};

    const product: Product ={
      id: this.currentProductID,
      name: this.productForm.name.value,
      brand: this.productForm.brand.value,
      price: this.productForm.price.value,
      category: this.productForm.category.value,
      countInStock: this.productForm.countInStock.value,
      description: this.productForm.description.value,
   //  richDescription: this.productForm.richDescription.value,
  // image: this.productForm.image.value,
      isFeatured:this.productForm.isFeatured.value
    }
    if(this.editmode){
      this._updateProduct(product)
    }else{
      this._addProduct(product)
    }
  }


  private _addProduct(product: Product){
    this.productsService.createProduct(product).subscribe(response =>{
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


  private _updateProduct(product: Product){
    let productTemp = {
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      isFeatured: product.isFeatured
    }

    this.productsService.updateProduct(productTemp, product.id)
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
        this.currentProductID = params.id;
        this.productsService.getProduct(params.id).subscribe(product =>{
          this.productForm.name.setValue(product.name);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.category.setValue(product.category.id);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
        })
      }
    })
  }


  get productForm(){
    return this.form.controls;
  }

  back(){
    this.location.back();
  }

  onImageUpload(event){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageDisplay = fileReader.result
      };
      fileReader.readAsDataURL(file);
    }
  }
}















