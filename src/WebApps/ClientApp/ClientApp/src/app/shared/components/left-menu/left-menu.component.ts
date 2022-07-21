import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[];
  public products: any[] = [];
  //public filterbyCategory: any[] = []
  public filterbyCategory: any[] = []
  constructor(private router: Router, public navServices: NavService) {
    // this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems );
    //this.filterbyCategory = this.navServices.filterbyCategory
    this.filterbyCategoryFunc()
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

   filterbyCategoryFunc() {
     // const category = [...new Set(this.products.map(product => product.type))]
    //  const category = [...new Set(this.products.map(product => product.subCategories?.name))]
   }


  ngOnInit(): void {
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
