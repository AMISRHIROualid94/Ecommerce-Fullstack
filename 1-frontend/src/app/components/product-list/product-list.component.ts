import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategory: number;
  previousCategoryId: number = 1;
  productName: String;
  currentProdName: String;



  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  storage: Storage = sessionStorage;
  constructor(
    private productService: ProductService,
    private cartService : CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    const hasKeyword = this.route.snapshot.paramMap.has('keyword');
    if (hasKeyword) {
      this.route.params.subscribe((param) => {
        this.productName = param['keyword'];
      });

        this.productService.getProductByNamePaginate(
          this.productName,
          this.thePageNumber - 1,
          this.thePageSize,)
        .subscribe((data)=>{
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;
        })
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.route.params.subscribe((param) => {
        this.currentCategory = +param['id'];
      });
    } else {
      this.currentCategory = 1;
    }

    if (this.previousCategoryId != this.currentCategory) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategory;

    this.productService
      .getProductPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategory
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  getSelected(page:String){
    this.thePageSize = +page;
    this.listProducts();
  }

  addToCart(product : Product){
    console.log("Adding to cart: "+product.name + " "+product.unitPrice)

    const theCartItem = new CartItem(product);
    this.cartService.addToCart(theCartItem);
  }
}
