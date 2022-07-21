import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WindowService } from '../WindowService';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [WindowService]
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup; 

  public closeResult: string;
  CodeVerfication: boolean  = false
  RegisterObj: any;

  windowRef: any;
  code: string
  user: any;


  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private win: WindowService,
  ) {
    this.createRegisterForm();
   }

   createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      // 	^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$
      email: ['' , [Validators.required, Validators.email ]],
      password: ['' , [Validators.required, Validators.pattern('^.{6,}')]],
      phone:['', [Validators.required, Validators.pattern('(03)[0-9]{9}')]],
      // , Validators.pattern('((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$')
      confirmPassword: [''],
    })
  }


  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    const new_fire = firebase.initializeApp(environment.firebase)
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function (response) { 
      }
    });
    this.windowRef.recaptchaVerifier.render(); 
  }

  open() {

    this.spinner.show()
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  // onSubmit() {
  //   debugger
  //   this.spinner.show()
  //   if (!this.RegisterObj.username)
  //   {
  //     // alert("Please enter user name")
  //     this.toastr.info('Please enter user name!', 'User Name');
  //     this.spinner.hide()
  //     return  
  //   }
  //   if (!this.RegisterObj.username.trim())
  //   { 
  //     this.toastr.info('Please Enter Valid User Name!', 'Wrong User Name');
  //     this.spinner.hide()
  //     return
  //   }
  //   if (!this.RegisterObj.email)
  //   {
  //     this.toastr.info('Please Enter Email!', 'Email');
  //     this.spinner.hide()
  //     return  
  //   }
  //   if (!this.RegisterObj.password)
  //   {
  //     this.toastr.info('Please Enter Password!', 'Password');
  //     this.spinner.hide()
  //     return  
  //   }

  //   this._authService.register(this.RegisterObj).subscribe((result) => {
  //     this.spinner.hide()
  //     if(result.includes("User name is already exist"))
  //     {
  //       this.toastr.info('User Name Is Already Exist!', 'Already Exist')
  //     }
  //     else if(result.includes("Email is already exists!"))
  //     {
  //       this.toastr.info('Email Is Already Exist!', 'Already Exist')
  //     }
  //     else if (result.includes("Phone number is already exists!"))
  //     {
  //       this.toastr.info('Phone Number Is Already Exist!', 'Already Exist')
  //     }
  //     else if(result.includes("User creation failed! Please check user details and try again."))
  //     {
  //       this.toastr.error("User creation failed! Please check user details and try again.", "User Creation Failed")
  //     }
  //     else 
  //     {
  //       this.toastr.info('You Are Successfully Registered!', 'Registration')
  //       this.spinner.hide()
  //       this.RegisterObj = new RegisterModel()
  //       TODO: navigate to page
  //     }
  //   })

  // }

}
