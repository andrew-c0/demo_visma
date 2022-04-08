import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './pages/auth/create-account/create-account.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { RebatesComponent } from './pages/rebates/rebates.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { StoreComponent } from './pages/store/store.component';
import { AuthGuard } from './guard/auth.guard';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {path: '', component: StoreComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "create-account", component: CreateAccountComponent},
  {path: "store", component: StoreComponent, canActivate: [AuthGuard]},
  {path: "store/:category", component: StoreComponent, canActivate: [AuthGuard]},
  {path: "rebates", component: RebatesComponent, canActivate: [AuthGuard]},
  {path: "reports", component: ReportsComponent, canActivate: [AuthGuard]},
  {path: "customers", component: CustomersComponent, canActivate: [AuthGuard]},
  {path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
