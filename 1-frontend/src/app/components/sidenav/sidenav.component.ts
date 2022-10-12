import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { navbarData } from './nav-data';


export interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations:[
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity:0}),
      animate('350ms',
      style({opacity:1}))
      ]),
      transition(':leave',[
        style({opacity:1}),
      animate('350ms',
      style({opacity:0}))
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform:'rotate(0deg)',offset:'0'}),
          style({transform:'rotate(2turn)',offset:'1'})

        ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

@Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  productCategories : ProductCategory[];
  navdata : navbarData[];

  constructor(private productService :ProductService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.navdata = this.productService.navdata;
    this.listProductCategories();
  }

  // bodyHeightfrmHome(){
  //   this.productService.setBodyHeight(100);
  //   console.log( this.productService.bodyHeight + " From navigation");
  // }
  // bodyHeightfrmlinks(){
  //   this.productService.setBodyHeight(0);
  //   console.log( this.productService.bodyHeight + " From links");
  // }
  listProductCategories() {
   this.productService.getProductCategories().subscribe(
    data => {
      // console.log(JSON.stringify(data));
      this.productCategories = data;
    }
   )
  }

  @HostListener('window:resize',['$event'])
onResize(event:any){
  this.screenWidth = window.innerWidth;
  if(this.screenWidth <=768){
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    })
  }
}

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
     screenWidth:this.screenWidth
    })
    console.log(this.screenWidth);
  }

  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed:this.collapsed,
      screenWidth:this.screenWidth
    })
    console.log(this.screenWidth);
  }
}
