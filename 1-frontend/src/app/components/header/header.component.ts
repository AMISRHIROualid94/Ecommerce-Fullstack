import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Customer } from 'src/app/common/customer';
import { CartService } from 'src/app/services/cart.service';
import { CutomersService } from 'src/app/services/cutomers.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() screenWidth = 0
  productName : String="";
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  
  loginToggle : boolean = false;
  
  isAuthenticated: boolean = false;
  userFullName: string;
  customer : Customer;
  storage: Storage = sessionStorage;
  
  constructor(private router:Router,
    private route:ActivatedRoute,
    private cartService : CartService,
    private oktaAuthService: OktaAuthService,
    private customerService : CutomersService) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
        console.log("header"+ this.storage.getItem("UserEmail")); 

      }
    );
   
  }

  // getCustomerTempOrder(email : string){
  //   this.customerService.getCustomers(email).subscribe(
  //     res =>{
  //       this.customer = res; 
  //       this.totalQuantity = this.customer.tempOrder;
  //       this.cartService.totalQuantity.next(this.customer.tempOrder);
  //     }
  //   )
   
  //}
  updateCartStatus() {
    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
  clearSearch(){
    this.route.url.subscribe(res =>{
      if(res[0].path != "home"){
       console.log(res[0].path);
       
      }
    })
  }
  onChange(newValue:String) {
    this.productName = newValue;
    if(this.productName.length>0){
      this.router.navigate(["/search/",this.productName]);
    }
    else{
      this.router.navigate(["/home"]);
    }
  }

  searchFocus(){
    if(this.productName.length>0){
      this.router.navigate(["/search/",this.productName]);
    }
    else{
      this.router.navigate(["/home"]);
    }
    
  }
  // onSubmit(prodName : String){
  //   this.router.navigate(["/search",prodName]);
  // }
  toggleLoggin(){
    this.loginToggle = !this.loginToggle;
  }
  //////////


 getUserDetails() {
    if (this.isAuthenticated) {

      // Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;

          const email = res.email;

          this.storage.setItem("UserEmail",JSON.stringify(email));
          //this.getCustomerTempOrder(email);
        }
      );
    }
  }

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.oktaAuthService.signOut();
  }

}
