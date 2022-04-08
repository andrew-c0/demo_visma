import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, AddProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  productCategories: string[] = [];

  products: Product[] = [];

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  displayProductForm : boolean = false;

  addProduct: AddProduct = {
    name: '',
    price: 0,
    category: ''
  }

  ngOnInit(): void {
    this.refreshProductList();
  }

  addToCart(product: Product) : void {
    this.cartService.addToCart(product);
  }

  toggleProductForm(): void {
    this.displayProductForm = !this.displayProductForm;
  }

  refreshProductList(): void {
    this.route.params.subscribe(routeParams => {
      if(routeParams['category']) {
        this.productsService.getProducts(routeParams['category']).subscribe(data => this.products = data);
      } else {
        this.productsService.getProducts().subscribe(data => this.products = data);
      }
    });
    this.productsService.getProductCategories().subscribe(data => this.productCategories = data);
  }

  createProduct() : void {
    this.productsService.addProduct(this.addProduct);
    this.addProduct = {
      name: '',
      price: 0,
      category: ''
    };
    this.displayProductForm = false;
    this.refreshProductList();
  }
}
