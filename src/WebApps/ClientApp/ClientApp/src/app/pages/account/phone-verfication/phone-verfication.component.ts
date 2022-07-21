import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

import * as firebase from 'firebase';
import {WindowService} from '../WindowService' 
import { environment} from '../../../../environments/environment' 
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-phone-verfication',
  templateUrl: './phone-verfication.component.html',
  styleUrls: ['./phone-verfication.component.scss'],
  providers: [WindowService]
})
export class PhoneVerficationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("ageVerification") AgeVerificationModal: TemplateRef<any>;

  @Input() windowRef : any;
  @Input() RegisterObj :any

  public closeResult: string;
  public ageVerificationForm:  FormGroup;
  public currdate: any;
  public setDate: any;
 
  cookieDate: Date
  // windowRef: any;
  code: string
  user: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    public _toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private win: WindowService,
    public _cookieService: CookieService,
    private _router: Router,
    private fb: FormBuilder,
    public productService: ProductService,
    ) { 
  	this.ageVerificationForm = this.fb.group({
      // day: ['', Validators.required],
      // month: ['', Validators.required],
      // year: ['', Validators.required],
      code: ['', Validators.required]
       
    })
  }


  


  ngOnInit(): void { 
    // this.windowRef = this.win.windowRef;
    // const new_fire = firebase.initializeApp(environment.firebase)
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    //   'size': 'invisible',
    //   'callback': function (response) { 
    //   }
    // });
    // this.windowRef.recaptchaVerifier.render(); 
  }
  sendLoginCode() {
    debugger;
    var appVerifier = this.windowRef.recaptchaVerifier;
    const num = "+923216641128";
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(
        error => console.log(error));
  }
  verifyLoginCode() {
    debugger;
    this.spinner.show()
    this.windowRef.confirmationResult
      .confirm(this.code)
      .then(result => {
        //alert("Code Is Right")
        this.onSubmit()
        
      })
      .catch((error) => {
        this._toaster.error("Please Enter Valid Code", "Error")
      })

  }
  ngAfterViewInit(): void {
  	// if(!localStorage.getItem("SelectedArea")) {
      this.openModal()
    // }
  }

  openModal() {
    //this.spinner.show()
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.AgeVerificationModal, { 
        size: 'md',
        backdrop: 'static',
        keyboard: false,
        centered: true,
        windowClass: 'bd-example-modal-md theme-modal agem'
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  areaSelectionForm() {
    // var day = this.ageVerificationForm.value.day;
    // var month = this.ageVerificationForm.value.month;
    // var year = this.ageVerificationForm.value.year;
    // var age = 18;
    // var mydate = new Date();
    // mydate.setFullYear(year, month-1, day);

    // var currdate = new Date();
    // this.currdate = currdate;
    // var setDate = new Date();         
    // this.setDate = setDate.setFullYear(mydate.getFullYear() + age, month-1, day);

    // if ((this.currdate - this.setDate) > 0){
    //   localStorage.setItem('ageVerification','true')
    //   this.modalService.dismissAll();
    // } else {
    //   window.location.href = "https://www.google.com/";
    // }
    debugger
    
    if (!this.code)
    {
      this._toaster.info("Please Select Area", "Area")
      this.openModal()
      return
    }
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


  onSubmit() {
    debugger
    this.spinner.show()
    if (!this.RegisterObj.username)
    {
      // alert("Please enter user name")
      this._toaster.info('Please enter user name!', 'User Name');
      this.spinner.hide()
      return  
    }
    if (!this.RegisterObj.username.trim())
    { 
      this._toaster.info('Please Enter Valid User Name!', 'Wrong User Name');
      this.spinner.hide()
      return
    }
    if (!this.RegisterObj.email)
    {
      this._toaster.info('Please Enter Email!', 'Email');
      this.spinner.hide()
      return  
    }
    if (!this.RegisterObj.password)
    {
      this._toaster.info('Please Enter Password!', 'Password');
      this.spinner.hide()
      return  
    }

  }

  

  ngOnDestroy() {
    
  }

}