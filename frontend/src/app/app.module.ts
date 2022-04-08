import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateAccountComponent } from './pages/auth/create-account/create-account.component';
import { StoreComponent } from './pages/store/store.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { RebatesComponent } from './pages/rebates/rebates.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartService } from './services/cart/cart.service';
import { AuthService } from './services/auth/auth.service';
import { ProductsService } from './services/products/products.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    StoreComponent,
    CheckoutComponent,
    ReportsComponent,
    MiniCartComponent,
    RebatesComponent,
    CustomersComponent,
    DatatableComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CartService,
    AuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
