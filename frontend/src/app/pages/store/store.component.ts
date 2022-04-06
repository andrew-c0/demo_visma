import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from 'src/app/dummyData';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  productCategories: string[] = this.productsService.getProductCategs();

  products: Product[] = this.productsService.getProducts(this.route.snapshot.paramMap.get('category'));

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      if(routeParams['category']) {
        this.products = this.productsService.getProducts(routeParams['category']);
      }
    });
  }

  addToCart(product: Product) : void {
    this.cartService.addToCart(product);
  }

}
