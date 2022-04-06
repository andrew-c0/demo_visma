import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cartItem';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cartItems => this.cartItems = cartItems);
  }

  finishOrder(): void {
    this.cartService.clearCart();
  }

  cartSubtotal() : number {
    if(this.cartItems.length == 0) {
      return 0;
    }
    let total = 0;
    this.cartItems.forEach(el => total += el.product.realPrice || el.product.price);
    return total;
  }

}
