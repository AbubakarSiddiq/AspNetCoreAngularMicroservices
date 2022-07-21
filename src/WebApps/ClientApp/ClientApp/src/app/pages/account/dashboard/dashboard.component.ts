import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Table } from 'primeng/table';
import { OrderDetailComponent } from 'src/app/shared/components/modal/order-detail/order-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public openDashboard: boolean = false;

  userEmail: string;
  userInfo: any;
  public MyOrders: any[] = [];
 
  public IsOrderDetailShow: boolean = false

  statuses: any[];
  loading: boolean = true;
  @ViewChild("dt") table: Table; 

  @Input() orderId: any;
  @Input() orderDetailModal: boolean = true; // Default False
  @ViewChild("orderDetailModal") OrderDetailModal: OrderDetailComponent;


  constructor(
    public _cookieService: CookieService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    debugger;
    this.userEmail = this._cookieService.get("UserEmail");
    if (this.userEmail) {
      //this._authService.getUserInfo(this.userEmail).subscribe((result) => {
        //this.userInfo = result;
      //});
    }
    this.getAllMyOrders(this.userEmail);
     
  }

  getAllMyOrders(email: string) {
    //this._orderService.myOrders(email).subscribe((result) => {
      //this.MyOrders = result;
      //this.loading = false;
    //});
  }

  logout() {
    this._cookieService.delete("auth_token")
    this._cookieService.delete("UserEmail")
    // this._router.navigate(['/home/vegetable']);
    this._router.navigate(['/']);
  }
  //start table block

//   onRowSelect(event) {
//     if (event.data)
//     {
//       debugger
//       this.orderDetailModal = true
//       this.OrderDetailModal.openModal(event.data.orderId)
       
//     }
//     // this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
// }

// onRowUnselect(event) {
//   this.IsOrderDetailShow = false
//     // this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
// }


  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  }
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), "date", "equals");
  }
  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, "activity", "gte");
      }
    }
  }
  //end table block
  
  
  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }
}
