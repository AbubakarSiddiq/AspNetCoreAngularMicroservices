import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { OrderResponseModel } from 'src/app/models/order-response-model';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit{
  public orderDetails: OrderResponseModel[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {	
    this.orderService.GetOrdersByUserName('swn').subscribe((result) => {
      this.orderDetails = result;
    });
  }
}
