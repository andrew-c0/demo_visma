import { Injectable } from '@angular/core';
import { products } from 'src/app/dummyData';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(category?: string | null) : Product[] {
    if(category) {
      return products.filter(el => el.category == category);
    }
    return products;
  }

  getProductCategs() : string[] {
    let categories: string[] = [];
    products.forEach(el => {
      if(!categories.includes(el.category)) {
        categories.push(el.category);
      }
    })
    return categories;
  }
}
