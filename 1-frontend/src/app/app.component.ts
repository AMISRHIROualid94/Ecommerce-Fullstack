import { Component, OnInit } from '@angular/core';
import { SideNavToggle } from './components/sidenav/sidenav.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
 
  title = 'projet-ecommerce';
  isSideNavCollapsed = false;
  screenWidth = 0;
  opening = true;

  onToggleSideNav(data:SideNavToggle){
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
    console.log(data.screenWidth);
    
  }

  JoinUs(){
    this.opening = false;
  }
}
