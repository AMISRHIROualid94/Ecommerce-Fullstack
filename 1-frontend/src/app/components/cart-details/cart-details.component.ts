import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cartItem';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  totalPrice: number = 0.0;
  totalQuantity: number = 0;
  cartItems:CartItem[] = [];
  products:Product[] = [];
  product : Product = new Product();

  constructor(private cartService : CartService,
    private productService : ProductService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
    this.cartService.computeCartTotals();
  }
  incrementQuantity(tempCartItem: CartItem){
    this.cartService.addToCart(tempCartItem);
  }
  decrementQuantity(tempCartItem:CartItem){
    this.cartService.decrementQuantity(tempCartItem);
  }
  remove(tempCartItem: CartItem){
    this.cartService.remove(tempCartItem);
  }


}
