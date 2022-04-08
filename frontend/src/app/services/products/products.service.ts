import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/app/environment';
import { Product, AddProduct } from 'src/app/interfaces/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProducts(category?: string | null) : Observable<Product[]> {
    if(category) {
      return this.http.get<Product[]>(env.apiUrl + '/products/category/' + category, {headers: {
        "Authorization" : "Bearer " + this.authService.getToken()
      }});
    }
    return this.http.get<Product[]>(env.apiUrl + '/products');
  }

  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(env.apiUrl + '/products/category/all', {headers: {
      "Authorization" : "Bearer " + this.authService.getToken()
    }});
  }


  addProduct(product: AddProduct) : void {
    let payload = {
      name: product.name,
      price: product.price,
      category: product.category,
      is_active: true,
      created_at: (new Date).toJSON()
    }
    this.http.post(env.apiUrl + '/products/add', payload, {headers: {
      "Authorization" : "Bearer " + this.authService.getToken()
    }}).subscribe((response) => {
      
    },(error) => {
      alert('There was a problem creating the product. Please try again later.');
      console.log(error);
    });
  }
}
