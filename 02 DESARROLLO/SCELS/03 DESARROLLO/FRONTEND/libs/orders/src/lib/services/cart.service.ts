import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService { 

  constructor() { }

  initCartLocalStorage(){
    const initialCart ={
      items: []
    };
    
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);
  }
}
