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
      subtotal: product.realPrice || product.price
    };
    this.cart.next([...this.cart.value, cartItem]);
  }

  clearCart() : void {
    this.cart.next([]);
  }
}
