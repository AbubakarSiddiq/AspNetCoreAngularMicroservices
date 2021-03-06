import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header-four',
  templateUrl: './header-four.component.html',
  styleUrls: ['./header-four.component.scss']
})
export class HeaderFourComponent implements OnInit {

  @Input() class: string = 'header-2 header-6';
  @Input() themeLogo: string = 'assets/images/icon/ingrocer-LOGO-1.png'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;

  constructor(
    public productService: ProductService,
    public _cookieService: CookieService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.themeLogo = 'assets/images/icon/logo.png';
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 300 && window.innerWidth  > 400) { 
      this.stick = true;
    } else {
      this.stick = false;
    }
  }

  logout() {
    debugger
    this.spinner.show()
    this._cookieService.delete("auth_token")
    this._cookieService.delete("UserEmail")
    // this._router.navigate(['/home/vegetable']);
    this._router.navigate(['/']);
    this.spinner.hide()
  }

  isLoggedIn() {
    return true;
  }




}
