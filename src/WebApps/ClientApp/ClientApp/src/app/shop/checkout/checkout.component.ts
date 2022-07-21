import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment'
import { ViewportScroller } from '@angular/common';
import { CatalogModel } from 'src/app/models/catalog-model';
import { BasketService } from 'src/app/services/basket.service';
import { BasketModel } from 'src/app/models/basket-model';
import { BasketCheckoutModel } from 'src/app/models/basket-checkout-model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products: CatalogModel[] = [];
  userEmail: string 

  public cartItem: BasketModel;
  public Order: BasketCheckoutModel = {} as BasketCheckoutModel;
  constructor(private fb: FormBuilder,
    private router: Router,
    private viewScroller: ViewportScroller,
    private basketService: BasketService
    ) { 
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')] ],
      lastName: ['', [Validators.required , Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.basketService.GetBasket('swn').subscribe((result) => {
      this.cartItem = result;
    });
    this.viewScroller.scrollToPosition([0, 0]); 
  }

  public get getTotal(): number {
    return this.cartItem.totalPrice;
  }

  submit() {
    if (this.checkoutForm.valid) {
      const userName = 'swn';
      this.basketService.GetBasket(userName).subscribe((response) => {
        this.cartItem = response;
        this.Order.userName = userName;
        this.Order.totalPrice = this.cartItem.totalPrice;
        this.basketService.CheckoutBasket(this.Order).subscribe((result) => {
          this.router.navigate(['/checkout/success']);
        });
      });      
    }
  }
}
