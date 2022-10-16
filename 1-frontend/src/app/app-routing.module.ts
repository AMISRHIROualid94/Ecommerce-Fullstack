import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-list/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
const routes: Routes = [
  {path: 'order-history',component:OrderHistoryComponent, canActivate:[OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},


  {path:'checkout',component:CheckoutComponent},
  {path:'cart-details',component:CartDetailsComponent},
  {path:'products/:id',component:ProductDetailsComponent},
  {path:'search/:keyword',component:ProductListComponent},
  {path:'category/:id',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  // {path:'products',component:ProductListComponent},
  {path:'home',component:HomeContentComponent},
  // {path:'', redirectTo:'/products',pathMatch:'full'},
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
