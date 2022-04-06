import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cartItem';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent implements OnInit {

  isAuth: boolean = false;

  cartOpen: boolean = false;

  cartItems: CartItem[] = [];

  constructor(private authService: AuthService, public cartService: CartService) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isAuth => this.isAuth = isAuth);
    this.cartService.getCart().subscribe(cartItems => this.cartItems = cartItems);
  }

  cartSubtotal() : number {
    if(this.cartItems.length == 0) {
      return 0;
    }
    let total = 0;
    this.cartItems.forEach(el => total += el.product.realPrice || el.product.price);
    return total;
  }

  toggleCart() : void {
    this.cartOpen = !this.cartOpen;
  }

}
