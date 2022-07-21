import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WindowService } from '../WindowService';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers: [WindowService]
})
export class ForgetPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup
  public ageVerificationForm:  FormGroup;

  public updatePasswordForm: FormGroup; 
  CodeVerfication: boolean = false
  windowRef: any;
  code: string
  user: any;
  ForgotPasswordObj: any;
  updatePassordObj: any;


  isUpdatePassword: boolean = false


  constructor(
    
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private fb : FormBuilder,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private win: WindowService,
  ) { 
    this.createForgotPassword();
    this.createUpdatePasswrodForm(); 
    this.ageVerificationForm = this.fb.group({
       
      code: ['', Validators.required]
       
    })
    this.CodeVerfication = false
    this.isUpdatePassword = false
  }

  createForgotPassword() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('(03)[0-9]{9}') ]]
    })
  }

  createUpdatePasswrodForm() {
    this.updatePasswordForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern('(03)[0-9]{9}') ]],
      password: ['', [Validators.required, Validators.pattern('^.{6,}')]]
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

  forgotPassword() {
    this.spinner.show()
  } 

  verifyLoginCode() {
    debugger;
    this.spinner.show()
    this.windowRef.confirmationResult
      .confirm(this.code)
      .then(result => {
        // this._router.navigate(['/update/password'],   {data: this.user});
        // this._router.navigateByUrl('/update/password', )
        this.isUpdatePassword = true  
        this.spinner.hide()
      })
      .catch((error) => {
        this.toastr.error("Please Enter Valid Code", "Error")
        this.spinner.hide()
      })

  }

  onSubmit() {
    debugger
    this.spinner.show()
    // if (!this.updatePassordObj.username)
    // {
    //   // alert("Please enter user name")
    //   this.toastr.info("Please Enter Phone Number", "Update Password")
    //   return  
    // }
  }  

}
