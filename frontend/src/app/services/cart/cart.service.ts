import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cartItem';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  currentCart = this.cart.asObservable();
  constructor() { }

  getCart(): BehaviorSubject<CartItem[]> {
    return this.cart;
  }

  addToCart(product: Product) : void {
    let cartItem: CartItem = {
      product: product,
      quantity: 1,
      subtotal: product.price
    };
    let existingProduct = this.cart.value.findIndex(el => el.product == product);
    if(existingProduct >= 0) {
      let localCart = this.cart.value;
      localCart[existingProduct].quantity += 1;
      this.cart.next(localCart);
    } else {
      this.cart.next([...this.cart.value, cartItem]);
    }
  }

  clearCart() : void {
    this.cart.next([]);
  }
}
