import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cartItem';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product : Product = new Product();
  screenWidth: number;
  constructor(private productService : ProductService,
    private cartService : CartService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.getProductDetails(+params['id']);
        
      }
    
    )
  }

getCardClass(){
    this.screenWidth = window.innerWidth;
    let styleClass = '';
    if(this.screenWidth <=800){
    styleClass = 'card-d-column';
    }
    else{
      styleClass = 'card';
    }
    return styleClass;
  }
  getImageClass(){
    this.screenWidth = window.innerWidth;
    let styleClass = '';
    if(this.screenWidth <=1000){
    styleClass = 'card-d-column';
    }
    else{
      styleClass = 'card';
    }
    return styleClass;
  }


  getProductDetails(id:number){
   this.productService.getProductById(id).subscribe(
      data => {
        this.product = data
      }
   )
  }

  addToCart(){
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
