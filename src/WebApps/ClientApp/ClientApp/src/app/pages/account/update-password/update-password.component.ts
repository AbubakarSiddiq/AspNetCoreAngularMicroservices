import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  public updatePasswordForm: FormGroup;
  updatePassordObj: any;
  constructor(
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) { 
    this.createUpdatePasswrodForm(); 
  }

  createUpdatePasswrodForm() {
    this.updatePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('(03)[0-9]{9}') ]],
      password: ['', [Validators.required, Validators.pattern('^.{6,}')]]
    })
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.spinner.show()
  }  

}
