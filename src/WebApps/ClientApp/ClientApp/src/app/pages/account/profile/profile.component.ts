import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  currentPassword: string;
  confirmPassword: string;
  loading: boolean = false;
  userEmail: string;
  userInfo: any;
  areas: any[] = []
  areaObj: any
  ProfileObj: any;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _router: Router,
    public _cookieService: CookieService
  ) {
    this.updateProfileForm();
  }

  updateProfileForm() {
    this.profileForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      // 	^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.pattern("^.{6,}")]], //Validators.required,
      phone: ["", [Validators.required, Validators.pattern("(03)[0-9]{9}")]],
      // , Validators.pattern('((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$')
      confirmPassword: ["", [Validators.pattern("^.{6,}")]], //Validators.required,
      currentPassword: ["", [Validators.pattern("^.{6,}")]], //Validators.required,
      firstName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')] ], 
      lastName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      area: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAll(); 
  }
  getAllAreas() {
  }
  getAll() {
    debugger;
    this.userEmail = this._cookieService.get("UserEmail");
    if (this.userEmail) {
    }
  }

  async onSubmit() {
    this.loading = true;
    debugger;
    if (this.currentPassword != null) {
    }
  }
}
