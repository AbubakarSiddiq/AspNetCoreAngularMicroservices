import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  cookieDate: Date
  LoginObj: any;
  constructor(
    private toastr: ToastrService,
    public _cookieService: CookieService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private spinner: NgxSpinnerService,
    public productService: ProductService,
  ) {
    this.createLoginForm();
   }
   createLoginForm() {
    this.loginForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required , Validators.pattern('(03)[0-9]{9}')]],
      password: ['', [Validators.required, Validators.pattern('^.{6,}')]],
    })
  }
  ngOnInit(): void {
  }

  login() {
    this.spinner.show()  
  }
}
