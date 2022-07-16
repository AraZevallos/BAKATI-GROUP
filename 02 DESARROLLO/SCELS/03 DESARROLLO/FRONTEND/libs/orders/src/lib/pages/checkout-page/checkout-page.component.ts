import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  
  constructor(private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  backToCart(){
    this.router.navigate(['/cart']);
  }

}
