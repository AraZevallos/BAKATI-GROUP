import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@frontend/users';
import { OrderItem } from '../../models/order-item';
import * as countriesLib from 'i18n-iso-countries';

declare const require;
@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {


  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries= Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry =>{
      return {
        id: entry[0],
        name: entry[1]
      }
    })
    console.log(this.countries);
    
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}
