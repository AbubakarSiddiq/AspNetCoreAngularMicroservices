import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer-two',
  templateUrl: './footer-two.component.html',
  styleUrls: ['./footer-two.component.scss']
})
export class FooterTwoComponent implements OnInit {

  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.png'; // default Logo
  @Input() mainFooter: boolean = true; // Default true 
  @Input() subFooter: boolean = false; // Default false 
  
  public today: number = Date.now();
  suggestProductObj: any;


  constructor(
    public _toaster : ToastrService,
    public _spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  SuggestAProduct() {
    this._spinner.show()
    debugger
    if (!this.suggestProductObj.productName) {
      this._toaster.warning("Please Enter Product Name", "Request Item")
      this._spinner.hide()
      return
    }
    if (!this.suggestProductObj.productName.trim()) {
      this._toaster.warning("Please Enter Product Name", "Request Item")
      this._spinner.hide()
      return
    }
  }

}
