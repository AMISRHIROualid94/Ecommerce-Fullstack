import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { NoItemFoundedComponent } from './components/no-item-founded/no-item-founded.component';
import { ProductDetailsComponent } from './components/product-list/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { Router} from '@angular/router';
import {OKTA_CONFIG,OktaAuthModule} from '@okta/okta-angular';
import myConfigApp from './config/my-config-app';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HomeContentComponent } from './components/home-content/home-content.component';



const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);

    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, myConfigApp.oidc);


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ProductListComponent,
    HeaderComponent,
    NoItemFoundedComponent,
    ProductDetailsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    OrderHistoryComponent,
    HomeContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatCardModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
