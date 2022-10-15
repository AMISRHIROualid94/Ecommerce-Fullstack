import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { navbarData } from '../components/sidenav/nav-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


navdata : navbarData[] = [
  new navbarData('fal fa-books','BOOKS'),
  new navbarData('fal fa-mug','COFFEE MUG'),
  new navbarData('fal fa-palette','MOUSE PADS'),
  new navbarData('fal fa-tags','LUGGAGE TAGS')
]

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  private BasePutUrl = 'http://localhost:8080/api/products/setProduct';

  constructor(private httpClient : HttpClient) { }

  getProductById(id:number) : Observable<Product>{
    const detailsUrl = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(detailsUrl)
  }


setProductUnitInStock(product:Product,id:number) : Observable<any> {
  const putUrl = `${this.BasePutUrl}/${id}`;
  return this.httpClient.put<String>(putUrl,product);
}
  getProductList(categoryId:number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }
  getProductByName(productName:String): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${productName}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductByNamePaginate(productName:String,thePage:number,thePageSize:number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${productName}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
  }
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }


  getProductPaginate(thePage:number,
    thePageSize:number,
    theCategoryId:number) : Observable<GetResponseProducts>{
      const url = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
      return this.httpClient.get<GetResponseProducts>(url)
    }
}

interface  GetResponseProducts{
  _embedded:{
    products : Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface  GetResponseProductCategory{
  _embedded:{
    productCategory : ProductCategory[];
  }
}

